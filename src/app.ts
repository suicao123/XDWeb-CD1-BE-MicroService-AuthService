/// <reference path="./types/index.d.ts" />

// const express=require('express')

import express from 'express';
import 'dotenv/config';
import innitDatabase from './config/seed';
import cors from 'cors';
import apiRoutes from './routes/api';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api routes
apiRoutes(app);

innitDatabase();
//handel 404 notFound
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`My app is running on port:${PORT}`);
  console.log('env port: ' + process.env.PORT);
});
