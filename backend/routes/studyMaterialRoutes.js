const express = require("express");
const router = express.Router();
const {
  getAllMaterials,
  getMaterialById,
  getMaterialsGrouped,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/studyMaterialController");

router.get("/", getAllMaterials);
router.get("/grouped", getMaterialsGrouped);
router.get("/:id", getMaterialById);
router.post("/", createMaterial);
router.put("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);

module.exports = router;
