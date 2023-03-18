const express = require("express");
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const app = express.Router();

app.get("/signup", async(req, res) => {
    const user = await User.find();
    res.status(200).send(user);
})

app.post("/signup", async(req, res) => {
    const {name, email, password } = req.body;
    try {
        if(!name || !email || !password) {
            res.send("Missing details")
        }
        const isExist = await User.findOne({email})
        if(isExist) {
            return res.send({msg: "User allready exist"})
        }
        const user = new User({email, name, password})
        await user.save();
        return res.send(user)

    } catch (error) {
        
    }
})