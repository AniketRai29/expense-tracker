const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const exportRoutes = require("./routes/exportRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

/* ---------------- MIDDLEWARES ---------------- */

// 🔐 Security headers
app.use(helmet());

// ⚡ Compress responses
app.use(compression());

// 🌐 CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173"
    ],
    credentials: true
  })
);

// JSON parser
app.use(express.json());

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/export", exportRoutes);

/* ---------------- STATIC FILES ---------------- */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

/* ---------------- ERROR HANDLERS ---------------- */

app.use(notFound);
app.use(errorHandler);

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});