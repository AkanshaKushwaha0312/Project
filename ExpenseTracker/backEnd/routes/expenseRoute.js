const express = require('express');
const mongoose = require('mongoose');
const expense = require('../models/expenseModel');
const router = express.Router();
router.post('/add', async (req, res) => {
  try {
    // const dateStr = req.body.expenditureDate;
    // const date = new Date(dateStr).toISOString().split('T')[0];
    // console.log('Parsed Date:', date); // Add this line for debugging
   // const expenseRecord = await expense.create({ ...req.body, expenditureDate: date });
   const expenseRecord = await expense.create({ ...req.body });
   // const expenseRecord = await expense.create({ ...req.body, expenditureDate: date });
   //console.log(req.body.expenditureDate);
   //const expenseRecord = await expense.create(req.body);
    res.status(201).json(expenseRecord);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});
router.get('/all', async (req, res) => {
  try {
    const expenseList = await expense.find();
    res.status(200).json(expenseList);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const expenseRecord = await expense.findByIdAndDelete(req.params.id);
    res.status(200).json(expenseRecord);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});
router.patch('/edit/:id', async (req, res) => {
  try {
    const newExpense = await expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(newExpense);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});
router.get('/monthlyExpenditure', async (req, res) => {
  try {
    const monthlyExp = await expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: {
              date: ('$expenditureDate'),
              timezone: "+0530"
  } },
            month: { $month: {
            date: ('$expenditureDate'),
            timezone: "+0530"
  } },
            
          },
      //    totalAmount: { $sum: '$amount' },
          spentAmount: {
            $sum: {
              $cond: {
                if: { $eq: ['$spentReceived', 'Spent'] },
                then: '$amount',
                else: 0,
              },
            },
          },
          receivedAmount: {
            $sum: {
              $cond: {
                if: { $eq: ['$spentReceived', 'Recieved'] },
                then: '$amount',
                else: 0,
              },
            },
          },
        },
      },
    ]);
    console.log(monthlyExp); // Log the data to the console
   res.status(200).json(monthlyExp);
  } catch (error) {
   console.log(error);
   throw new Error(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const expenseRecord = await expense.findById(req.params.id);
    res.status(200).json(expenseRecord);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});
module.exports = router;