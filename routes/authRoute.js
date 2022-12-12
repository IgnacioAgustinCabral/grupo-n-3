const express = require('express');
const { validateRequestBySchema } = require('../middlewares/validateRequestSchema')
const { postLogin } = require('../controllers/authController');
const { loginSchema } = require('../schemas/auhtSchema');

const router = express.Router();

router.post('/login', validateRequestBySchema(loginSchema), postLogin);

module.exports = router;