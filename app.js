require("dotenv").config();

//creating an instance of express
const express = require("express");

//creating an instance af an app to use methods/properties of express
const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

//middleware or to set router
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
