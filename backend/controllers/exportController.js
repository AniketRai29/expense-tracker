const XLSX =
  require("xlsx");

const Income =
  require("../models/Income");

const Expense =
  require("../models/Expense");


const exportIncome =
  async (req, res) => {
    const income =
      await Income.find({
        userId: req.user.id
      });

    const workbook =
      XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(
        income
      );

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Income"
    );

    const buffer =
      XLSX.write(
        workbook,
        {
          type: "buffer",
          bookType: "xlsx"
        }
      );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income.xlsx"
    );

    res.send(buffer);
  };


  const exportExpense =
  async (req, res) => {
    const expenses =
      await Expense.find({
        userId: req.user.id
      });

    const workbook =
      XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(
        expenses
      );

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Expenses"
    );

    const buffer =
      XLSX.write(
        workbook,
        {
          type: "buffer",
          bookType: "xlsx"
        }
      );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expenses.xlsx"
    );

    res.send(buffer);
  };

  module.exports = {
  exportIncome,
  exportExpense
};