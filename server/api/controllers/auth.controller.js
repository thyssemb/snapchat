const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const SECRETKEY = "THYSSKEY";

const API_URL = 'https://snapchat.epidoc.eu';

const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await axios.post(`${API_URL}/user`, {
            email,
            password: hashedPassword,
            username
        });

        const user = await User.create({
            email,
            password: hashedPassword,
            username,
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email }, SECRETKEY);

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = { register, login };
