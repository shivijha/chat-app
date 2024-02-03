const asyncHandler = required("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler( async(req, res, next) =>{
    let token;
    let authHeader = req.header.Authorization || req.header.authorization
    if(authHeader && authHeader.startWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded))
        if(err){
            res.status(401).json("User unauthorised")
        }
        req.user = decoded.user
        next();
    }

    if(!token){
        res.status(401).json("User unauthorised or wrong token")
    }

})