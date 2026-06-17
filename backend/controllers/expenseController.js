const Expense = require("../models/Expense");

const addExpense = async (
  req,
  res
) => {
  try {
    const {
      category,
      amount,
      icon,
      date
    } = req.body;
    if (!category) {
  res.status(400);
  throw new Error(
    "Category required"
  );
}

if (!amount || amount <= 0) {
  res.status(400);
  throw new Error(
    "Amount must be greater than 0"
  );
}
    const expense =
      await Expense.create({
        userId: req.user.id,
        category,
        amount,
        icon,
        date
      });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getExpense = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { startDate, endDate } = req.query;

    let filter = {
      userId: req.user.id
    };

    // safer date handling
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start) && !isNaN(end)) {
        filter.date = {
          $gte: start,
          $lte: end
        };
      }
    }

    const total = await Expense.countDocuments(filter);

    const expense = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      expense
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getExpense };

const deleteExpense = async (
  req,
  res
) => {
  const expense =
    await Expense.findById(
      req.params.id
    );

  if (!expense) {
    res.status(404);
    throw new Error(
      "Expense not found"
    );
  }

  if (
    expense.userId.toString() !==
    req.user.id
  ) {
    res.status(401);
    throw new Error(
      "Unauthorized"
    );
  }

  await expense.deleteOne();

  res.json({
    success: true,
    message:
      "Expense deleted successfully"
  });
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense
};