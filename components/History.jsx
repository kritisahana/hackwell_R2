"use client";
import React, { useState, useEffect } from "react";

const History = ({ patientId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetchHistory();
    }
  }, [patientId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forms/patient/${patientId}?days=7`);
      if (!response.ok) throw new Error("Failed to fetch history");

      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="history-container">
      <h2 className="text-lg font-bold mb-2">Health History (Last 7 Days)</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-600">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Blood Pressure</th>
              <th>Glucose</th>
              <th>Heart Rate</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                <td>{entry.type}</td>
                <td>{entry.values?.bloodPressure || "-"}</td>
                <td>{entry.values?.glucose || "-"}</td>
                <td>{entry.values?.heartRate || "-"}</td>
                <td>{entry.values?.bmi || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
