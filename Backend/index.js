require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./src/config/db")
const PORT = process.env.PORT
// const userRoute = require("./src/routes/userRoutes");
// const loginRoute = require("./src/routes/LoginRoute");


const app = express();

app.use(express.json());
app.use(cors());
// app.use("/", userRoute)
// app.use("/", loginRoute)

app.get("/", (req, res) => {
    res.status(200).send({message: "Hello"})
});

app.listen(PORT, async() => {
    await ConnectDB()
    console.log(`Listing to server ${PORT}`)
})