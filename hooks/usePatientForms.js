import { useState, useEffect } from 'react';

export const usePatientForms = (patientId) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (days = 7) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forms/patient/${patientId}?days=${days}`);
      if (!response.ok) throw new Error('Failed to fetch history');
      
      const data = await response.json();
      setForms(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    forms,
    loading,
    error,
    submitForm,
    fetchHistory
  };
};