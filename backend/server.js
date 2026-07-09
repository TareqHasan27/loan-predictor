const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const predictionRoutes = require("./routes/prediction.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { testDbConnection } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictionRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await testDbConnection();

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();