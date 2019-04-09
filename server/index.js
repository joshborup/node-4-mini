const express = require("express");
const app = express();
const messagesCtrl = require("./messagesCtrl");
const session = require("express-session");
app.use(express.json());
require("dotenv").config();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  let badWords = ["knucklehead", "jerk", "internet explorer", "voldemort"];
  if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], "g");
      req.body.message = req.body.message.replace(regex, "****");
    }
    next();
  } else {
    next();
  }
});

app.get("/api/messages", messagesCtrl.getAllMessages);
app.post("/api/message", messagesCtrl.createMessage);
app.get("/api/messages/history", messagesCtrl.history);

app.listen(SERVER_PORT, () =>
  console.log(
    `my server is listening on port and then dollarsign ${SERVER_PORT}`
  )
);
