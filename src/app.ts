// const express=require('express')
import express from 'express';
import 'dotenv/config';
import webRoutes from 'routes/web';
import innitDatabase from 'config/seed';
import passport from 'passport';
import configPassportLocal from 'src/middleware/passport.local';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static file: images/css/js
app.use(express.static('public'));

//config session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

//config routes
webRoutes(app);

//handel 404 notFound
app.use((req, res) => {
  res.send('404 not found');
});
innitDatabase();
app.listen(PORT, () => {
  console.log(`My app is running on port:${PORT}`);
  console.log('env port: ' + process.env.PORT);
});
