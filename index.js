const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");

const app = express();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://counter:FswSGIDm4Gwq5DY6@cluster0.qwd9s.mongodb.net/count?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const counter = "jackjurycv";
let newcount;
let filter = {
  _id: null,
};
let replacementDocument = {
  _id: null,
  counter: counter,
  count: null,
};

app.use(volleyball);
app.use(cors());
app.use(express.json());

app.get("/count", (req, res) => {
  const file = "count.txt";
  res.json({
    count: newcount,
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
<<<<<<< HEAD
  countdb();
  const browser = await puppeteer.launch();
=======
  count();
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
>>>>>>> 988f9e6b988e479eaa70e47211e1219d85b1e69c
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

async function countdb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = client.db("DB");
    const collection = database.collection("count");
    const find = await collection.find({
      counter: counter,
    });
    await find.forEach((element) => {
      filter._id = element._id;
      newcount = element.count + 1;
    });

    console.log(newcount);
    replacementDocument._id = filter._id;
    replacementDocument.count = newcount;
    await collection.replaceOne(filter, replacementDocument);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
