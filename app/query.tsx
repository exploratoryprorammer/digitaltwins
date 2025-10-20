"use client";
import { useState } from "react";

export default function UCSFResearchRunner() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runResearch = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/runResearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: [] }), // add arguments if needed
      });

      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Run UCSF Research Pipeline</h1>
      <button
        onClick={runResearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Python Script"}
      </button>

      {output && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}
