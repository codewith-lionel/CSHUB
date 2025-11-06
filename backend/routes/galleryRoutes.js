const express = require("express");
const router = express.Router();
const {
  getAllImages,
  getImageById,
  getFeaturedImages,
  getImagesByCategory,
  createImage,
  updateImage,
  deleteImage,
  likeImage,
} = require("../controllers/galleryController");

router.get("/", getAllImages);
router.get("/featured", getFeaturedImages);
router.get("/category/:category", getImagesByCategory);
router.get("/:id", getImageById);
router.post("/", createImage);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);
router.post("/:id/like", likeImage);

module.exports = router;
