const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const authenticate = require("../middleware/authMiddleware");
const app = express.Router();

app.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;
    console.log(name, email, password, username)
    try {
        if (!name || !email || !password || !username) {
            return res.send({ msg: "Missing details" })
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

    } catch (e) {
        res.send({ msg: e.msg })
    }
})

app.post("/login", async (req, res) => {
    const { email, password, username } = req.body;
    try {
        if ((!email && !username) || !password) {
            return res.send({ message: "Missing Details" });
        }
        const isExist = await User.findOne({ $or: [{ username }, { email }] });
        if (!isExist) {
            return res.send({ message: "Email does not exist" });
        }
        bcrypt.compare(password, isExist.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ email, username, id:isExist.id }, process.env.SECRET, {
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

app.use(authenticate)
app.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        if (!query) {
            return res.send({ msg: "Missing details" })
        }
        const user = await User.find({ $or: [{ username: { $regex: query, $options: "i" } }, { email: { $regex: query, $options: "i" } }, { name: { $regex: query, $options: "i" } }] }, { password: 0 });
        return res.send(user)
    } catch (e) {
        return res.send({ msg: e.msg })
    }
})

app.put("/follow", async (req, res) => {
    const { userId } = req.body;
    try {
        if (!userId) {
            return res.status(400).send({ msg: "Missing details" })
        }
        
        const isExist = await User.findOne({ _id: req.id, following: { $in: userId } })
        if (isExist) {
            const newuser = await User.findOneAndUpdate({ _id: req.id }, { $pull: { following: userId } }, { new: true }).select("-password")
            const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { follower: req.id } }, { new: true }).select("-password")
            res.send({ newuser, user })
        } else {
            const newuser = await User.findOneAndUpdate({ _id: req.id }, { $push: { following: userId } }, { new: true }).select("-password")
            const user = await User.findOneAndUpdate({ _id: userId }, { $push: { follower: req.id } }, { new: true }).select("-password")
            res.send({ newuser, user})
        }
    } catch (e) {
        return res.status(404).send({ msg: e.msg })
    }

})


module.exports = app;