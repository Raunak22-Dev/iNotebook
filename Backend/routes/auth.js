const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =require("../middleware/fetchuser")


const secret ="a1sdd782x8d9ljgvxmg@dtcfmv82546fuckyouzchg"
// Route 1:- Create a User using: POST '/api/auth/createuser'. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    // Check for validation errors
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // Destructure the request body
    const { name, email, password } = req.body;

    try {
      // Check if a user with the given email already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log(`User already exists with email: ${email}`); //existing User's email
        return res.status(400).json({Success: "False" , error: "User with this email already exists." });
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);

      // Create and save the new user to the database
      user = await User.create({ name, email, password: secPassword });

      console.log(`New user created, UserName: ${name} ,UserEmail ${email}`);
      console.log(`${user}`)
      const data={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,secret)
      console.log(token)
      return res.status(201).json({ Success: "True" ,message: "User created successfully", token });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


//Route 2:- Create a User using: POST '/api/auth/login'. No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid Password ").exists(),
  ],
  async (req, res) => {
    // Check for validation errors,if error return Bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
  
    const {email, password} = req.body;
    try {
      let user =await User.findOne({email})
      if(!user ){
        return res.status(400).json({Success: "False", error:"Please try to login with  correct credentials"})
      }
      const passwordCompare=await bcrypt.compare(password,user.password)
      if(!passwordCompare ){
      console.log(" unable to login ");

        return res.status(400).json({Success: "False" ,error:"Please try to login with correct credentials"})
      }
      const data={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,secret)
      console.log("login successfully");
      return res.status(200).json({ Success: "True" ,message: "login successfully", token });
      

    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  
  })

//Route 3:- get loggedin Deatil using : POST '/api/auth/getuser'.  login required
router.post(
  "/getuser",fetchuser, async (req, res) => {
try {
  const userId =req.user.id
  const user =await User.findById(userId).select("-password")
  res.status(200).json(user)


} catch (error) {
  console.error("Error creating user:", error);
      return res.status(500).json({Success: "False" , message: "Internal server error" });
}
  })
module.exports = router;
