const express = require("express");
const router = express.Router();
const {
  getAllAchievements,
  getAchievementById,
  getFeaturedAchievements,
  getAchievementsByCategory,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");

router.get("/", getAllAchievements);
router.get("/featured", getFeaturedAchievements);
router.get("/category/:category", getAchievementsByCategory);
router.get("/:id", getAchievementById);
router.post("/", createAchievement);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

module.exports = router;
