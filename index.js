const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const TodoModel = require("./models/Todo");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.CONN_STR || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "CONN_STR or MONGODB_URI is not set. Add your MongoDB Atlas connection string to your environment variables.",
  );
}

app.get("/get", (req, res) => {
  TodoModel.find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });


    // production build
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
