const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    source: String,

    amount: Number,

    icon: String,

    date: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Income", incomeSchema);