const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Sign Up (Create User)
exports.signup = async (req, res) => {
    try {
        const { username, password, fullName, role } = req.body;

        // Check if user with the same username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            username,
            password: hashedPassword,
            fullName,
            role,
        });

        // Respond with success
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({
            message: 'Error registering user',
            error: error.message || 'Something went wrong',
        });
    }
};

// Login (Authenticate User)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password with hashed password stored in DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store token in the user object (optional, if needed)
        user.token = token;
        await user.save();

        // Respond with token
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all users (List users)
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit User (Update user details)
exports.editUser = async (req, res) => {
    try {
        const { id, username, password, fullName, role } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (fullName) user.fullName = fullName;
        if (role) user.role = role;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout (Invalidate token)
exports.logout = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the token from user (if needed)
        user.token = null;
        await user.save();

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteAccount = async (req, res) => {
    try {
        const userId  = req.user.id;

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user account
        await user.destroy();

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({
            message: 'Error deleting account',
            error: error.message || 'Something went wrong',
        });
    }
};
