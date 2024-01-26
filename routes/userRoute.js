const express = require("express")
const {
    registerUser,
    loginUser
} = require("../controller/userController")

const router = express.Router();

//Register Api   
router.post("/register", registerUser)

//Login Api
router.post("/login", loginUser)

module.exports = router