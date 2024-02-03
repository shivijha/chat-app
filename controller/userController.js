const asynchandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config();


const registerUser = asynchandler(async (req, res) => {
    console.log("lokeshwaaaaaaaaaaa", req.body)
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory!")
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400)
        throw new Error("User all ready register")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400)
        throw new Error("User data is not valid")
    }
});

const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All field are mandatory!")
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN)
        res.status(200).json({accessToken: token , message : "User logged in successfully"})
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
})
module.exports = {
    registerUser,
    loginUser
}