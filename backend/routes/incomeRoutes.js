const express = require("express");

const router = express.Router();

const {
  addIncome,
  getIncome,
  deleteIncome
} = require("../controllers/incomeController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  addIncome
);

router.get(
  "/",
  authMiddleware,
  getIncome
);

router.delete(
  "/:id",
  authMiddleware,
  deleteIncome
);

module.exports = router;