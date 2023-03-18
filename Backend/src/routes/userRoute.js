const express = require("express");
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();

app.get("/", async (req, res) => {
    const {query} = req.query;
    try {
        if(!query) {
            return res.send({msg: "Missing details"})
        }
        const user = User.find({$or: [{username: {$regex: query, $option: "i"}}, {email: {$regex: query, $option: "i"}}, {name: {$regex: query, $option: "i"}}]}, {password: 0});
        return res.send(user)
    } catch (e) {
        return res.send({msg: e.msg})
    }
})

app.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        if (!name || !email || !password || !username) {
            res.send("Missing details")
        }
        const isExist = await User.findOne({ username })
        if (isExist) {
            return res.send({ msg: "User allready exist" })
        }
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                return res.send(JSON.stringify({ message: "Something went wrong" }));
            } else {
                const user = new User({ name, email, password: hash, username });
                await user.save();
                return res.status(201).send({ email, name });
            }
        });

    } catch (error) {

    }
})

app.post("/login", async (req, res) => {
    const { email, password, username } = req.body;

    try {
        if ((!email && !username) || !password) {
            return res.send({ message: "Missing Details" });
        }
        const isExist = await User.findOne({ $or: [{username}, {email}] });
        if (!isExist) {
            return res.send({ message: "Email does not exist" });
        }
        bcrypt.compare(password, isExist.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ email, username }, "SECRET", {
                    expiresIn: "7 days",
                });
                return res.send({ token });
            }
            return res.send({ message: "Failed" });
        });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
});

app.put("/follow", async(req, res) => {
    const {userId,opperation} = req.body;
    try {
        if(!userId || !opperation) {

            return res.status(400).send({msg: "Missing details"})
        }
        if(opperation === "follow") {

            const user = await User.findOneAndUpdate({_id: req.id}, {$push: {follower: userId}}, {new: true})
            return res.status(200).send(user)
        }
        else if(opperation === "unfollow"){
            const user = await User.findByIdAndUpdate({_id: req.id}, {$pull: {follwer: userId}}, {new: true})
            return res.status(200).send(user)
        }
        throw new Error("Not a valid Opperation")
    } catch (e) {
        return res.status(404).send({msg: e.msg})
    }
    
})


module.exports = app;