const express = require("express");
const { login, register } = require("../controllers/authController");
const {
  addSkincare,
  getAllSkincareHandler,
  addSkincareFavorite,
} = require("../controllers/skincareController");
const {
  addHistory,
  getAllHistoryHandler,
  getByID,
} = require("../controllers/historyController");
const {
  getProfile,
  updateUserHandler,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authToken");

const router = express.Router();

// Route untuk login
router.post("/login", login);

router.post("/register", register);

router.get("/profile/:id", authenticateToken, getProfile);

router.put("/profile/:id", authenticateToken, updateUserHandler);

router.delete("/profile/:id", authenticateToken, updateUserHandler);

router.post("/skincare/add", authenticateToken, addSkincare);

router.get("/skincare", authenticateToken, getAllSkincareHandler);

router.post("/favorite/add", authenticateToken, addSkincareFavorite);

router.post("/history/add", authenticateToken, addHistory);

router.get("/history", authenticateToken, getAllHistoryHandler);

router.get("/history/:id", authenticateToken, getByID);

module.exports = router;
