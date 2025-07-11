import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import usermodel from "../models/usermodel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        console.log("User found in DB:", user);
        if (!user) {
            return res.json({ success: false, message: 'User doesnot exists' })
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if (ismatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
const registeruser = async (req, res) => {
    try {
        console.log("Register Request Body:", req.body);
        const { name, email, password } = req.body;
        const exists = await usermodel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newuser = new usermodel({
            name, email, password: hashedPassword
        })
        const user = await newuser.save();
        console.log("User saved:", user);
        const token = createToken(user._id)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
            console.log("Input email:", email);
            console.log("Input password:", password);
            console.log("Expected email:", process.env.ADMIN_EMAIL);
            console.log("Expected password:", process.env.ADMIN_PASSWORD);

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
export { loginuser, registeruser, adminlogin }