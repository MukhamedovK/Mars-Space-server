require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

const connectDB = require("./config/database");
const studentRouter = require("./routes/authRoutes");
const shopRouter = require('./routes/shopRouter');
const productsRouter = require('./routes/productsRouter');
const postsRouter = require('./routes/postsRouter')
const commentRouter = require('./routes/commentRouter')

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());


connectDB();

app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/comments", commentRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/posts', postsRouter); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
