const express = require('express');
const {
    allCategories,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { isUserAuthenticated, isAdmin } = require('../middlewares/jwt');
const { validateRequestBySchema } = require('../middlewares/validateRequestSchema')
const categorySchema = require('../schemas')
const router = express.Router();

router.use(isUserAuthenticated)

router.get('', allCategories);
router.get('/:id', getCategory);
router.post('/', isAdmin, validateRequestBySchema(categorySchema), postCategory)
router.put('/:id', isAdmin, validateRequestBySchema(categorySchema), updateCategory)
router.delete('/:id', isAdmin, deleteCategory)

module.exports = router