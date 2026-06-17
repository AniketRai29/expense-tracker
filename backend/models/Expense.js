const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    category: String,

    amount: Number,

    icon: String,

    date: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Expense", expenseSchema);