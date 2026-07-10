const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const predictionRoutes = require("./routes/prediction.routes");
const predictionHistoryRoutes = require("./routes/predictionHistory.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { testDbConnection } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/predictions", predictionHistoryRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await testDbConnection();

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
      console.log(`CORS enabled for ${FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("Failed to start backend server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();