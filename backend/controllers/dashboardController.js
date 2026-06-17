const Income =
  require("../models/Income");

const Expense =
  require("../models/Expense");

const getDashboardData =
  async (req, res) => {
    try {
      const incomes =
        await Income.find({
          userId: req.user.id
        });

      const expenses =
        await Expense.find({
          userId: req.user.id
        });

      const totalIncome =
        incomes.reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

      const totalExpense =
        expenses.reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

      const balance =
        totalIncome -
        totalExpense;

      const recentIncome =
        await Income.find({
          userId: req.user.id
        })
          .sort({
            date: -1
          })
          .limit(5);

      const recentExpense =
        await Expense.find({
          userId: req.user.id
        })
          .sort({
            date: -1
          })
          .limit(5);

      res.json({
        totalIncome,
        totalExpense,
        balance,
        recentIncome,
        recentExpense,
        allExpenses: expenses
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

module.exports = {
  getDashboardData
};