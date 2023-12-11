const User = require("../models/User");

// Middleware to check if the user is authenticated
const authenticateUser = async (req, res, next) => {
    const userId = req.headers['user-id'];
    const password = req.headers['password'];

    try {
        const user = await User.findOne({ userId, password });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Middleware to check if the user exists
const userExists = async (req, res, next) => {
    const userId = req.body.userId;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { authenticateUser, userExists };