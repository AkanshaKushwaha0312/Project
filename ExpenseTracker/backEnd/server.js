const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const expenseRoute = require('./routes/expenseRoute');

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log('connected successfully');
    app.listen(PORT || 8000, (err) => {
      if (err) console.log(err);

      console.log(`running successfully on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('error', error);
  });

app.use('/api/expenses', expenseRoute);
