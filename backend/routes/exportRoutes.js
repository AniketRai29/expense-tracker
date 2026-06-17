const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  exportIncome,
  exportExpense
} = require(
  "../controllers/exportController"
);

router.get(
  "/income",
  authMiddleware,
  exportIncome
);

router.get(
  "/expense",
  authMiddleware,
  exportExpense
);

module.exports = router;