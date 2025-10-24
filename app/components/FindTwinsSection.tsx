"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#FAFAFA",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: 8,
    "&:hover fieldset": {
      borderColor: "#0066CC",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0066CC",
    },
  },
}));

interface MedicalData {
  age: string;
  acei: string;
  invasive_line: string;
  kdigo_creatinine: string;
  kdigo_stages: string;
  kdigo_uo: string;
  lods: string;
  meld: string;
  milrinone: string;
  neuroblock: string;
  norepinephrine: string;
  norepinephrine_equivalent_dose: string;
  nsaid: string;
  oasis: string;
  oxygen_delivery: string;
}

const FindTwinsSection: React.FC = () => {
  const [medicalData, setMedicalData] = useState<MedicalData>({
    age: "",
    acei: "",
    invasive_line: "",
    kdigo_creatinine: "",
    kdigo_stages: "",
    kdigo_uo: "",
    lods: "",
    meld: "",
    milrinone: "",
    neuroblock: "",
    norepinephrine: "",
    norepinephrine_equivalent_dose: "",
    nsaid: "",
    oasis: "",
    oxygen_delivery: "",
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string>("");

  const handleInputChange =
    (field: keyof MedicalData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMedicalData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleFindTwins = async () => {
    setLoading(true);
    setResults("");

    try {
      // Here you would call your API endpoint with the medical data
      const response = await fetch("/api/findTwins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicalData),
      });

      const data = await response.json();
      setResults(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error finding twins:", error);
      setResults("Error occurred while finding similar patients");
    } finally {
      setLoading(false);
    }
  };

  const fieldLabels: Record<keyof MedicalData, string> = {
    age: "Age",
    acei: "ACE Inhibitor",
    invasive_line: "Invasive Line",
    kdigo_creatinine: "KDIGO Creatinine",
    kdigo_stages: "KDIGO Stages",
    kdigo_uo: "KDIGO Urine Output",
    lods: "LODS Score",
    meld: "MELD Score",
    milrinone: "Milrinone",
    neuroblock: "Neuroblock",
    norepinephrine: "Norepinephrine",
    norepinephrine_equivalent_dose: "Norepinephrine Equivalent Dose",
    nsaid: "NSAID",
    oasis: "OASIS Score",
    oxygen_delivery: "Oxygen Delivery",
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "white",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Find Patient Twins
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          mb: 4,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Enter patient medical data to find similar cases in our research
        database. This helps identify treatment patterns and outcomes for
        comparable patients.
      </Typography>

      <StyledPaper>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {Object.entries(fieldLabels).map(([field, label]) => (
            <Box key={field}>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  sx={{ color: "#0066CC", fontWeight: "bold" }}
                >
                  {label}
                </InputLabel>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  value={medicalData[field as keyof MedicalData]}
                  onChange={handleInputChange(field as keyof MedicalData)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </FormControl>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFindTwins}
            disabled={loading}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            {loading ? "Searching..." : "Find Similar Patients"}
          </Button>
        </Box>

        {results && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Results:
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: 2,
                borderRadius: 1,
                overflow: "auto",
                fontSize: "0.875rem",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                border: "1px solid #ddd",
              }}
            >
              {results}
            </Box>
          </Box>
        )}
      </StyledPaper>
    </Box>
  );
};

export default FindTwinsSection;
