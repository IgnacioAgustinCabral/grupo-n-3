const express = require('express');
const { getAllUsers, getUser, updateUser} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;
