const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");

const app = express();

app.use(volleyball);
app.use(cors());
app.use(express.json());

app.use("/static", express.static("public"));

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Listening on port", port);
});
