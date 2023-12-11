const Message = require("../models/Message");
const User = require("../models/User");

// Signup/Login
const signup = async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;

    if (!userId || !password) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const newUser = new User({ userId, password, followers: [] });
        await newUser.save();

        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// PostMessage
const postMessage = async (req, res) => {
    const user = req.user;
    const messageText = req.body.message;

    if (!messageText) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const newMessage = new Message({ userId: user.userId, message: messageText });
        await newMessage.save();

        // Notify followers
        for (const followerId of user.followers) {
            const follower = await User.findOne({ userId: followerId });
            if (follower) {
                if (follower?.messages?.length) {
                    follower.messages.push(newMessage);
                } else {
                    follower.messages = [newMessage];
                }
                await follower.save();
            }
        }

        res.json({ message: 'Message posted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// FollowUser
const followUser = async (req, res) => {
    const user = req.user;
    const userIdToFollow = req.body.userId;

    if (user.followers.includes(userIdToFollow)) {
        return res.status(409).json({ error: 'Already following the user' });
    }

    try {
        user.followers.push(userIdToFollow);
        await user.save();

        res.json({ message: `You are now following ${userIdToFollow}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GetMyFeed
const getMyFeed = async (req, res) => {
    const user = req.user;

    try {
        // Combine user's messages and messages from followed users
        const feed = await Message.find({ userId: { $in: [user.userId, ...user.followers] } })
            .sort({ timestamp: 'desc' })
            .exec();

        res.json({ feed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    signup,
    postMessage,
    followUser,
    getMyFeed,
};
