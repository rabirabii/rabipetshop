const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
// Import Routes
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
// Data Imports

/* Configuration  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./uploads")));
// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server Successfully Connected to : ${PORT}. Visit http://localhost:${PORT}/ In your browser`
      )
    );

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
  })
  .catch((error) => console.log(`${error} did not connect `));
