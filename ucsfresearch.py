import os
from flask import Flask, request, jsonify
from google.cloud import bigquery
from sklearn.preprocessing import StandardScaler
from pinecone import Pinecone, ServerlessSpec
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)


project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'master-anagram-430800-f0')

if not project_id:
    raise ValueError("Google Cloud Project ID not set. Please provide your project ID via environment variable GOOGLE_CLOUD_PROJECT.")

client = bigquery.Client(project=project_id)

queries = {
    'age': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.age` LIMIT 20",
    'acei': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.acei` LIMIT 20",
    'invasive_line': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.invasive_line` LIMIT 20",
    'kdigo_creatinine': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.kdigo_creatinine` LIMIT 20",
    'kdigo_stages': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.kdigo_stages` LIMIT 20",
    'kdigo_uo': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.kdigo_uo` LIMIT 20",
    'lods': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.lods` LIMIT 20",
    'meld': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.meld` LIMIT 20",
    'milrinone': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.milrinone` LIMIT 20",
    'neuroblock': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.neuroblock` LIMIT 20",
    'norepinephrine': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.norepinephrine` LIMIT 20",
    'norepinephrine_equivalent_dose': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.norepinephrine_equivalent_dose` LIMIT 20",
    'nsaid': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.nsaid` LIMIT 20",
    'oasis': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.oasis` LIMIT 20",
    'oxygen_delivery': "SELECT * FROM `physionet-data.mimiciv_3_1_derived.oxygen_delivery` LIMIT 20"
}

dataframes = {}
for table_name, query_string in queries.items():
    print(f"\nExecuting query for table: {table_name}")
    try:
        query_job = client.query(query_string)
        df = query_job.to_dataframe()
        dataframes[table_name] = df
        print(f"Successfully loaded data for {table_name} ({len(df)} rows).")
    except Exception as e:
        print(f"Error querying table {table_name}: {e}")

def create_state_vector_all_features(df_dict):
    state_vectors = {}
    for stay_id in get_all_stay_ids(df_dict):
        stay_data = {}
        age_df = df_dict.get('age')
        if age_df is not None:
            patient_ages = age_df[age_df['subject_id'].isin(get_subject_ids_for_stay(df_dict, stay_id))]
            if not patient_ages.empty:
                stay_data['age'] = patient_ages['age'].iloc[0]
        # ... (rest of the function remains the same as in your script)
        kdigo_uo_df = df_dict.get('kdigo_uo')
        if kdigo_uo_df is not None:
            uo_24hr = kdigo_uo_df[kdigo_uo_df['stay_id'] == stay_id]['uo_rt_24hr'].dropna().iloc[0] if not kdigo_uo_df[kdigo_uo_df['stay_id'] == stay_id]['uo_rt_24hr'].dropna().empty else None
            if uo_24hr is not None:
                try:
                    stay_data['uo_rt_24hr'] = float(uo_24hr)
                except ValueError:
                    stay_data['uo_rt_24hr'] = np.nan
        lods_df = df_dict.get('lods')
        if lods_df is not None:
            lods_score = lods_df[lods_df['stay_id'] == stay_id]['lods'].dropna().iloc[0] if not lods_df[lods_df['stay_id'] == stay_id]['lods'].dropna().empty else None
            if lods_score is not None:
                try:
                    stay_data['lods'] = float(lods_score)
                except ValueError:
                    stay_data['lods'] = np.nan
            for col in ['neurologic', 'cardiovascular', 'renal', 'pulmonary', 'hematologic', 'hepatic']:
                value = lods_df[lods_df['stay_id'] == stay_id][col].dropna().iloc[0] if not lods_df[lods_df['stay_id'] == stay_id][col].dropna().empty else None
                if value is not None:
                    try:
                        stay_data[f'lods_{col}'] = float(value)
                    except ValueError:
                        stay_data[f'lods_{col}'] = np.nan
        oasis_df = df_dict.get('oasis')
        if oasis_df is not None:
            oasis_score = oasis_df[oasis_df['stay_id'] == stay_id]['oasis'].dropna().iloc[0] if not oasis_df[oasis_df['stay_id'] == stay_id]['oasis'].dropna().empty else None
            if oasis_score is not None:
                try:
                    stay_data['oasis'] = float(oasis_score)
                except ValueError:
                    stay_data['oasis'] = np.nan
            for col in ['gcs', 'resprate', 'temp', 'urineoutput']:
                value = oasis_df[oasis_df['stay_id'] == stay_id][col].dropna().iloc[0] if not oasis_df[oasis_df['stay_id'] == stay_id][col].dropna().empty else None
                if value is not None:
                    try:
                        stay_data[f'oasis_{col}'] = float(value)
                    except ValueError:
                        stay_data[f'oasis_{col}'] = np.nan
        if stay_data:
            state_vectors[stay_id] = stay_data
    return pd.DataFrame.from_dict(state_vectors, orient='index')

def get_all_stay_ids(df_dict):
    stay_ids = set()
    for df in df_dict.values():
        if 'stay_id' in df.columns:
            stay_ids.update(df['stay_id'].unique())
    return list(stay_ids)

def get_subject_ids_for_stay(df_dict, stay_id):
    subject_ids = set()
    for df in df_dict.values():
        if 'stay_id' in df.columns and 'subject_id' in df.columns:
            subject_ids.update(df[df['stay_id'] == stay_id]['subject_id'].unique())
    for df in df_dict.values():
        if 'stay_id' in df.columns and 'subject_id' in df.columns and not df[df['stay_id'] == stay_id]['subject_id'].empty:
            return df[df['stay_id'] == stay_id]['subject_id'].unique()
    return set()

# Process state vectors
patient_states_all_df = create_state_vector_all_features(dataframes)
if not patient_states_all_df.empty:
    patient_states_imputed_df = patient_states_all_df.fillna(patient_states_all_df.mean(numeric_only=True)).fillna(0)
    scaler_all = StandardScaler()
    scaled_states_all = scaler_all.fit_transform(patient_states_imputed_df)
    scaled_states_all_df = pd.DataFrame(scaled_states_all, index=patient_states_imputed_df.index, columns=patient_states_imputed_df.columns)

    vectors_for_pinecone = [(str(stay_id), row.tolist()) for stay_id, row in scaled_states_all_df.iterrows()]
else:
    print("No patient state vectors could be created.")

pc = Pinecone(api_key="08180080-18aa-4999-b131-612b5b9b41aa")
index_name = "ucsfresearch"

if pc.has_index(index_name):
    pc.delete_index(index_name)
    print(f"Deleted Pinecone index '{index_name}'.")

if 'scaled_states_all_df' in locals() and not scaled_states_all_df.empty:
    vector_dimension = scaled_states_all_df.shape[1]
    if not pc.has_index(index_name):
        pc.create_index(
            name=index_name,
            dimension=vector_dimension,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    index = pc.Index(index_name)

    vectors_to_upsert = []
    epsilon = 1e-9
    for stay_id, row in scaled_states_all_df.iterrows():
        vector = np.array(row.tolist())
        if np.any(np.abs(vector) > epsilon):
            vectors_to_upsert.append({
                "id": str(stay_id),
                "values": vector.tolist(),
                "metadata": {
                    "subject_id": "unknown",
                    "treatment": "unknown",
                    "mortality_30d": False
                }
            })
    if vectors_to_upsert:
        index.upsert(vectors=vectors_to_upsert, namespace="data")
        print(f"Upserted {len(vectors_to_upsert)} vectors.")

def find_similar_patients(patient_state_vector, top_k=5):
    if len(patient_state_vector) != vector_dimension:
        return {"error": f"Input vector must have {vector_dimension} dimensions, but got {len(patient_state_vector)}."}
    try:
        index = pc.Index(index_name)
        query_results = index.query(
            vector=patient_state_vector,
            namespace="data",
            top_k=top_k,
            include_metadata=True
        )
        return [match.dict() for match in query_results.matches]
    except Exception as e:
        return {"error": f"Error querying Pinecone: {str(e)}"}

@app.route('/api/similar-patients', methods=['POST'])
def get_similar_patients():
    data = request.get_json()
    if not data or 'vector' not in data:
        return jsonify({"error": "No vector provided"}), 400
    patient_vector = data['vector']
    results = find_similar_patients(patient_vector, top_k=3)
    if 'error' in results:
        return jsonify(results), 400
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)