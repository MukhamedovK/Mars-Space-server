require("dotenv").config();
const express = require("express");
const cors = require("cors");
const studentRoutes = require('../src/routes/authRoutes')
const connectDB = require("./config/database");
const shopRouter = require("./routes/shopRouter");
const productsRouter = require("./routes/productsRouter");
const commentRouter = require("./routes/commentRouter");
const studentRouter = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/comments", commentRouter);
app.use('/api/v1/student', studentRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
