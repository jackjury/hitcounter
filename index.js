const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");

const app = express();

app.use(volleyball);
app.use(cors());
app.use(express.json());

app.get("/count", (req, res) => {
  const file = "count.txt";
  let count = fs.readFileSync(file, { encoding: "utf-8" });
  count = parseInt(count);
  res.json({
    count: count,
  });
});

app.get("/counter.png", (req, res) => {
  getImg();
  res.sendFile(__dirname + "/counter.png");
});

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});

async function getImg() {
  count();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 495,
    height: 72,
    deviceScaleFactor: 1,
  });
  await page.goto("https://hitcounter-client.netlify.app/");
  await page.screenshot({ path: "counter.png" });
  await browser.close();
}

function count() {
  const file = "count.txt";
  let count = fs.readFileSync(file, { encoding: "utf-8" });
  count = parseInt(count);
  count += 1;
  let output = count.toString();
  fs.writeFileSync(file, output);
}
