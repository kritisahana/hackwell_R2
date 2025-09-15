const express = require('express');
const router = express.Router();
const axios = require('axios');
const Joi = require('joi');

// Validation schemas
const predictionSchema = Joi.object({
  patient_id: Joi.string().uuid().required(),
  biometrics: Joi.object().required(),
  lifestyle: Joi.object().required()
});

// Create prediction
router.post('/', async (req, res) => {
  try {
    const { error: validationError, value } = predictionSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError.details[0].message });
    }

    const { patient_id, biometrics, lifestyle } = value;

    // Prepare data for ML model
    const predictionData = {
      ...biometrics.values,
      ...lifestyle.values,
      patient_id
    };

    // Call ML prediction API (you'll need to implement this)
    let predictionResult;
    try {
      const response = await axios.post(
        process.env.PREDICTION_API_URL || 'http://localhost:5000/predict',
        predictionData,
        {
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      predictionResult = response.data;
    } catch (apiError) {
      // Fallback prediction logic if ML API is not available
      console.warn('ML API not available, using fallback prediction');
      predictionResult = generateFallbackPrediction(predictionData);
    }

    // Store prediction in database
    const { data, error } = await req.supabase
      .from('predictions')
      .insert([{
        patient_id,
        risk_type: predictionResult.risk_type,
        score: predictionResult.score,
        explanation: predictionResult.explanation
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Prediction generated successfully',
      prediction: data
    });
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});

// Get patient predictions
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { limit = 10 } = req.query;

    const { data, error } = await req.supabase
      .from('predictions')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

// Get latest prediction for patient
router.get('/patient/:patientId/latest', async (req, res) => {
  try {
    const { patientId } = req.params;

    const { data, error } = await req.supabase
      .from('predictions')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return res.status(404).json({ error: 'No predictions found' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest prediction' });
  }
});

// Fallback prediction function (simple rule-based)
function generateFallbackPrediction(data) {
  let score = 0;
  let riskFactors = [];

  // Age factor
  if (data.age > 60) {
    score += 20;
    riskFactors.push('Advanced age');
  } else if (data.age > 40) {
    score += 10;
  }

  // BMI factor
  const bmi = data.bmi || (data.weight && data.height ? 
    data.weight / Math.pow(data.height / 100, 2) : null);
  
  if (bmi) {
    if (bmi > 30) {
      score += 15;
      riskFactors.push('Obesity');
    } else if (bmi > 25) {
      score += 8;
      riskFactors.push('Overweight');
    }
  }

  // Blood pressure
  if (data.systolic > 140 || data.diastolic > 90) {
    score += 20;
    riskFactors.push('High blood pressure');
  }

  // Glucose levels
  if (data.glucose > 126) {
    score += 25;
    riskFactors.push('High blood glucose');
  }

  // Lifestyle factors
  if (data.smoking === 'yes' || data.smoking === true) {
    score += 15;
    riskFactors.push('Smoking');
  }

  if (data.exercise === 'rarely' || data.exerciseFrequency < 2) {
    score += 10;
    riskFactors.push('Low physical activity');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  let riskLevel = 'Low';
  if (score > 70) riskLevel = 'High';
  else if (score > 40) riskLevel = 'Moderate';

  return {
    risk_type: `${riskLevel} Cardiovascular Risk`,
    score: parseFloat(score.toFixed(2)),
    explanation: riskFactors.length > 0 
      ? `Risk factors identified: ${riskFactors.join(', ')}. Consider lifestyle modifications and regular monitoring.`
      : 'Low risk profile. Continue maintaining healthy lifestyle habits.'
  };
}

module.exports = router;