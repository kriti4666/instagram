require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./src/config/db")
const PORT = process.env.PORT;
const userRoute = require("./src/routes/userRoute");
const postRoute = require("./src/routes/postRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute)
app.use("/feed", postRoute)

app.get("/", (req, res) => {
    res.status(200).send({message: "Hello"})
});

app.listen(PORT, async() => {
    await ConnectDB()
    console.log(`Listing to server ${PORT}`)
})