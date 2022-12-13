const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { uploadAvatar } = require("../middlewares/checkImage");
const { verifyIfOwnerOrAdmin } = require("../middlewares/verifyIfOwnerOrAdmin");
const router = express.Router();


router.get("/", verifyIfOwnerOrAdmin, getAllUsers);
router.get("/:id", verifyIfOwnerOrAdmin, getUser);
router.post("/create", uploadAvatar, createUser);
router.put("/:id", verifyIfOwnerOrAdmin, updateUser);
router.put("/delete/:id", verifyIfOwnerOrAdmin, deleteUser);

module.exports = router;
