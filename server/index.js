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
const user = require("./controllers/user.js");
const product = require("./controllers//product.js");
const doctor = require("./controllers/doctor.js");
const cart = require("./controllers/cart.js");
const order = require("./controllers/order.js");
const payment = require("./controllers/payment.js");
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

    app.use("/petshop/user", user); // Product.insertMany(dataProduct);
    app.use("/petshop/product", product);
    app.use("/petshop/doctor", doctor);
    app.use("/petshop/cart", cart);
    app.use("/petshop/order", order);
    app.use("/petshop/payment", payment);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    // Transaction.insertMany(dataTransaction);
  })
  .catch((error) => console.log(`${error} did not connect `));
