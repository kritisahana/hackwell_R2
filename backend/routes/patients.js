const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Validation schemas
const patientSchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  age: Joi.number().integer().min(1).max(150).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  location: Joi.string().max(255).optional()
});

// Get all patients (for doctors)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await req.supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

// Create new patient
router.post('/', async (req, res) => {
  try {
    const { error: validationError, value } = patientSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError.details[0].message });
    }

    const { data, error } = await req.supabase
      .from('patients')
      .insert([value])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error: validationError, value } = patientSchema.validate(req.body);
    
    if (validationError) {
      return res.status(400).json({ error: validationError.details[0].message });
    }

    const { data, error } = await req.supabase
      .from('patients')
      .update(value)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

module.exports = router;