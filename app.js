// Dependencies
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

// Routes
const api = require('./api');

// Setup Express Server
const app = express();

// Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Setup DB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Error Log
db.on('error', (error) => {
  console.error(error);
});

// Alert Established DB Connection
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Add Endpoints
app.use('', api);
app.use(express.static(__dirname + "/public"));

module.exports = app;
