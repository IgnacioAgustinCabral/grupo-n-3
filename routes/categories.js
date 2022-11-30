const express = require('express');
const {
    allCategories,
    getCategory
} = require('../controllers/categoryController')

const router = express.Router();

router.get('', allCategories);
router.get('/:id', getCategory);

module.exports = router