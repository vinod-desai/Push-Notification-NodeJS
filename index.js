const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Body Parser Middleware (Included in Express)
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey =
  "BKDFg8DwuJuDQDllwOEAUA1fNVXgC51Q1MrVJIhzHL7VBBf9deAIilpA3bvbLhXE0DLwfThY6nZwTIFVm4uuv6g";
const privateVapidKey = "CI22Buc2IUs0JLRCIUfsHbs2dt4VDz1X1yAha6TxfjU";

webpush.setVapidDetails(
  "mailto:email@email.com",
  publicVapidKey,
  privateVapidKey
);

// Below route is resposible for sending push notification
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  console.log(`Subscription object: ${JSON.stringify(req.body)}`);
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Alert/Notification" });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
