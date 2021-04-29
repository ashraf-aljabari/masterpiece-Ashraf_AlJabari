import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import http from 'http';
// middleware imports

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// routes imports
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

// env files configuration
dotenv.config();

// Connecting to mongoDB
connectDB();

// Initializing express
const app = express();

// To deal with json objects between frontend and back end
app.use(express.json());

// To run frontend and backend on localhost
app.use(cors());

// Users routes
app.use('/api/users', userRoutes);

// Complains routes
// app.use('/api/complaints', complaintRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware for handling 404 requests
app.use(notFound);

// Middleware for handling api errors
app.use(errorHandler);

// Default port
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
