const env = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const router = require("./src/routes/router.js");
const { db } = require("./src/databases/database");
const session = require("express-session");
const cookie = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./src/models/users");
require("./src/controllers/commands/auth");

//settings
app.set("port", process.env.PORT || 3001);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
} else {
  app.use(cors());
}

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use("/api/backend/", router);

//start server
app.listen(app.get("port"), () => {
  console.clear();
  console.log(`lisent on port: ${app.get("port")}`);
  setInterval(async () => {
    await users.updateMany({}, { $set: { envelopes: 3 } });
  }, 86400000);
});
