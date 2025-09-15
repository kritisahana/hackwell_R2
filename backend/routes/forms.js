const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Validation schemas
const formSchema = Joi.object({
  patient_id: Joi.string().uuid().required(),
  type: Joi.string().valid('biometrics', 'lifestyle', 'symptoms', 'medications').required(),
  values: Joi.object().required()
});

// Submit new form
router.post('/', async (req, res) => {
  try {
    const { error: validationError, value } = formSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError.details[0].message });
    }

    const { data, error } = await req.supabase
      .from('patient_forms')
      .insert([value])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Form submitted successfully',
      form: data
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Get patient forms history (last 7 days or all)
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { days = 7, limit = 50 } = req.query;

    let query = req.supabase
      .from('patient_forms')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    // Filter by days if specified
    if (days && days !== 'all') {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(days));
      query = query.gte('created_at', daysAgo.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Transform data for history display
    const historyData = data.map(form => ({
      id: form.id,
      date: form.created_at,
      type: form.type,
      values: form.values,
      // Extract key vitals for easy display
      bloodPressure: form.values.bloodPressure || form.values.systolic && form.values.diastolic 
        ? `${form.values.systolic}/${form.values.diastolic}` : 'N/A',
      glucose: form.values.glucose || 'N/A',
      heartRate: form.values.heartRate || 'N/A',
      bmi: form.values.bmi || (form.values.weight && form.values.height 
        ? (form.values.weight / Math.pow(form.values.height / 100, 2)).toFixed(1) : 'N/A')
    }));

    res.json(historyData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient forms' });
  }
});

// Get latest forms for prediction
router.get('/patient/:patientId/latest', async (req, res) => {
  try {
    const { patientId } = req.params;

    // Get the most recent biometrics and lifestyle forms
    const { data: biometrics, error: bioError } = await req.supabase
      .from('patient_forms')
      .select('*')
      .eq('patient_id', patientId)
      .eq('type', 'biometrics')
      .order('created_at', { ascending: false })
      .limit(1);

    const { data: lifestyle, error: lifeError } = await req.supabase
      .from('patient_forms')
      .select('*')
      .eq('patient_id', patientId)
      .eq('type', 'lifestyle')
      .order('created_at', { ascending: false })
      .limit(1);

    if (bioError || lifeError) {
      return res.status(400).json({ 
        error: bioError?.message || lifeError?.message 
      });
    }

    if (!biometrics.length || !lifestyle.length) {
      return res.status(404).json({ 
        error: 'Missing required forms for prediction. Please ensure both biometrics and lifestyle forms are completed.' 
      });
    }

    res.json({
      biometrics: biometrics[0],
      lifestyle: lifestyle[0]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest forms' });
  }
});

module.exports = router;