const express = require("express");
const User = require("../Model/UserSchema");
const Employer = require("../Model/EmployerSchema");
const Employee = require("../Model/EmployeeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../Middleware/Upload");
const {userVerification, refreshToken,auth} = require ("../Middleware/Auth"); 

const SignUp = async (req, res) => {
    const {
        name, age, dob, email, password, phone, education, stream,
        companyName, designation, years, skills, hobbies,
        drinkingOrSmoking, height, weight, role
    } = req.body;

    try {
        // Check if the user already exists in either User or Employer collection
        const existingUser = await User.findOne({ email });
        const existingEmployer = await Employer.findOne({ email });
        const existingEmployee = await Employee.findOne({ email });

        if (existingUser || existingEmployer || existingEmployee) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Corrected this line

        // Create a new user or employer instance based on the role
        let newUser;
        if (role === 'Job Seeker') {
            newUser = new User({
                name,
                age,
                dob,
                email,
                password: hashedPassword,
                phone,
                education,
                stream,
                skills,
                hobbies,
                drinkingOrSmoking,
                height,
                weight,
                profilePhoto: req.file.filename
            });
        } else if (role === 'Employer') {
            newUser = new Employer({
                name,
                age,
                dob,
                email,
                password: hashedPassword,
                phone,
                education,
                stream,
                companyName,
                designation,
                years,
                skills,
                hobbies,
                drinkingOrSmoking,
                height,
                weight,
                profilePhoto: req.file.filename
            });
        } else if(role === 'Employee'){ 
            newUser = new Employee({
                name,
                age,
                dob,
                email,  
                password: hashedPassword,
                phone,
                education,
                stream,
                companyName,
                designation,
                years,
                skills,
                hobbies,
                drinkingOrSmoking,
                height,
                weight,
                profilePhoto: req.file.filename
            });

        }else{
            return res.status(400).json({ message: "Invalid role specified" });
        }

        // Save the user or employer to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: `${role} created successfully` });
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const Get = async (req, res) => {
    try {
        const users = await User.find();
        const employers = await Employer.find(); // Fixing the typo to Employer
        return res.status(200).json([...users, ...employers]);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
const getUser = async (req, res) => {
    try {
        // Try finding the user in the User model
        let user = await User.findById(req.params.id);
        
        // If not found in User, try finding in the Employee model
        if (!user) {
            user = await Employee.findById(req.params.id);
        }

        // If not found in Employee, try finding in the Employer model
        if (!user) {
            user = await Employer.findById(req.params.id);
        }

        // If still not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If found in any of the models, return the user data
        res.json(user);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ message: err.message });
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check in both User, Employer, and Employee collections
        let user = await User.findOne({ email });
        if (!user) {
            user = await Employer.findOne({ email });
            if (!user) {
                user = await Employee.findOne({ email });
            }
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const accessToken = jwt.sign({ email: email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ email: email, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true, secure: true, sameSite: "strict" });
        res.cookie('refreshToken', refreshToken, { maxAge: 604800000, httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json({ success: true, message: "Login success", data: { user, token: accessToken } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const Logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: "Logged Out" });
};

module.exports = { SignUp, Get, Login,Logout,getUser };
