require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subsRouter = require('./routes/subscribers');
app.use('/subscribers', subsRouter)


app.listen(3000, () => console.log("Server has started!"));
