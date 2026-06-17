const Income = require("../models/Income");

const addIncome = async (
  req,
  res
) => {
  try {
    const {
      source,
      amount,
      icon,
      date
    } = req.body;
    if (!source) {
  res.status(400);
  throw new Error(
    "Income source required"
  );
}

if (!amount || amount <= 0) {
  res.status(400);
  throw new Error(
    "Amount must be greater than 0"
  );
}
    const income =
      await Income.create({
        userId: req.user.id,
        source,
        amount,
        icon,
        date
      });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getIncome = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { startDate, endDate } = req.query;

    let filter = {
      userId: req.user.id
    };

    // safer date validation
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

    const total = await Income.countDocuments(filter);

    const income = await Income.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      income
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getIncome };

const deleteIncome = async (
  req,
  res
) => {
  const income =
    await Income.findById(
      req.params.id
    );

  if (!income) {
    res.status(404);
    throw new Error(
      "Income not found"
    );
  }

  if (
    income.userId.toString() !==
    req.user.id
  ) {
    res.status(401);
    throw new Error(
      "Unauthorized"
    );
  }

  await income.deleteOne();

  res.json({
    success: true,
    message:
      "Income deleted successfully"
  });
};

module.exports = {
  addIncome,
  getIncome,
  deleteIncome
};