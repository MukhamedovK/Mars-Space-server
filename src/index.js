require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
