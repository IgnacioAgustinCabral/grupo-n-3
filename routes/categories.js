const express = require('express');
const {
    allCategories,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController')
const {validateRequestBySchema} = require('../middlewares/validateRequestSchema')
const categorySchema = require('../schemas')
const router = express.Router();

router.get('', allCategories);
router.get('/:id', getCategory);
router.post('/',validateRequestBySchema(categorySchema), postCategory)
router.patch('/:id', validateRequestBySchema(categorySchema), updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router