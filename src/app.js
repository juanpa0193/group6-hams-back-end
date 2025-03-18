// Typescript attempt
// import express,{ Application} from 'express';
// import bodyParser from 'body-parser';
// import userRoute from './routes/users';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const appointmentsRoute = require('./routes/appointments')
const doctorRoute = require('./routes/doctors');
const cors = require('cors');

// Allow access from another port (dev port) to this one 
app.use(cors());

//JSON Body Parser
app.use(bodyParser.json());

// Routes
app.use('/users', userRoute);
app.use('/appointments', appointmentsRoute)
app.use('/doctors', doctorRoute);

module.exports = app;