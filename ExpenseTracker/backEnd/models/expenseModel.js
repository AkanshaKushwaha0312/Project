const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  spentReceived: String,
  category:String,
  expenditureDate:Date
});

const Expense = mongoose.model('expenses', expenseSchema);
module.exports = Expense;
