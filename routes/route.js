const express = require('express');
const router = express.Router();

const {
    signup,
    postMessage,
    followUser,
    getMyFeed,
} = require('../controllers/controller');
const { authenticateUser, userExists } = require('../middleware/middleware');

router.post('/signup', signup);
router.post('/postmessage', authenticateUser, postMessage);
router.post('/followuser', authenticateUser, userExists, followUser);
router.get('/getmyfeed', authenticateUser, getMyFeed);

module.exports = router;