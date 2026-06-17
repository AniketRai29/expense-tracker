const express = require("express");

const router = express.Router();

const {
  addExpense,
  getExpense,
  deleteExpense
} = require("../controllers/expenseController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  addExpense
);

router.get(
  "/",
  authMiddleware,
  getExpense
);

router.delete(
  "/:id",
  authMiddleware,
  deleteExpense
);

module.exports = router;