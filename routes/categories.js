const express = require("express");
const {
  allCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isUserAuthenticated } = require("../middlewares/jwt");
const { isAdminRole } = require("../middlewares/isAdminRole");
const {
  validateRequestBySchema,
} = require("../middlewares/validateRequestSchema");
const categorySchema = require("../schemas");
const router = express.Router();

router.use(isUserAuthenticated);

router.get("", allCategories);
router.get("/:id", getCategory);
router.post(
  "/",
  isAdminRole,
  validateRequestBySchema(categorySchema),
  postCategory
);
router.put(
  "/:id",

  isAdminRole,
  validateRequestBySchema(categorySchema),
  updateCategory
);
router.delete("/:id", isAdminRole, deleteCategory);

module.exports = router;
