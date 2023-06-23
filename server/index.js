const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const doctor = require("./controller/doctor");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const reservation = require("./controller/reservation");
app.use("/api/petshop/user", user);
app.use("/api/petshop/doctor", doctor);
app.use("/api/petshop/conversation", conversation);
app.use("/api/petshop/message", message);
app.use("/api/petshop/order", order);
app.use("/api/petshop/shop", shop);
app.use("/api/petshop/product", product);
app.use("/api/petshop/event", event);
app.use("/api/petshop/coupon", coupon);
app.use("/api/petshop/payment", payment);
app.use("/api/petshop/withdraw", withdraw);
// app.use("/api/petshop/reservation", reservation);
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
