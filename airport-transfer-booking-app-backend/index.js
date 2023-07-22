const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const vehicleRoutes = require('./routes/vehicles');

const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb://127.0.0.1:27017/airportdata'; // Replace with your MongoDB connection string

app.use(cors());
app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


app.use('/api', vehicleRoutes);
