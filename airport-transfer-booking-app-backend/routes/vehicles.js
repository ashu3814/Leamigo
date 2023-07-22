const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');


router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle({
    name: req.body.name,
    capacity: req.body.capacity,
    origin: req.body.origin,
    destination: req.body.destination,
    date: req.body.date
  });

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/vehicles/:id', async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndRemove(req.params.id);
    if (deletedVehicle) {
      res.json({ message: 'Vehicle deleted' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
