const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Register
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body;
    
    // checking if user already exists
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400).send({ message: "User already Exists" });
        throw new Error("User already Exists");
    }

    // adding entry in collection
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400).send({ message: "Please try again" });
        throw new Error("Error Occured ")
    }
});

// Login
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400).send({ message: "Invalid Email or Password"});
        throw new Error("Invalid Email or Password")
    }
});

module.exports = {registerUser, authUser};