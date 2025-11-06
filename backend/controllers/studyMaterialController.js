const StudyMaterial = require("../models/StudyMaterial");

// Get all study materials (with filters)
exports.getAllMaterials = async (req, res) => {
  try {
    const { year, semester, subject, category, isActive = true } = req.query;

    let query = { isActive };

    if (year) {
      query.year = year;
    }

    if (semester) {
      query.semester = semester;
    }

    if (subject) {
      query.subject = subject;
    }

    if (category) {
      query.category = category;
    }

    const materials = await StudyMaterial.find(query).sort({
      year: 1,
      semester: 1,
      subject: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    console.error("Error fetching study materials:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching study materials",
      error: error.message,
    });
  }
};

// Get single study material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    console.error("Error fetching study material:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching study material",
      error: error.message,
    });
  }
};

// Get materials grouped by year and semester
exports.getMaterialsGrouped = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ isActive: true }).sort({
      year: 1,
      semester: 1,
      subject: 1,
    });

    // Group by year and semester
    const grouped = {};

    materials.forEach((material) => {
      const year = material.year;
      const semester = material.semester;

      if (!grouped[year]) {
        grouped[year] = {};
      }

      if (!grouped[year][semester]) {
        grouped[year][semester] = [];
      }

      grouped[year][semester].push(material);
    });

    res.status(200).json({
      success: true,
      data: grouped,
    });
  } catch (error) {
    console.error("Error fetching grouped materials:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching grouped materials",
      error: error.message,
    });
  }
};

// Create new study material
exports.createMaterial = async (req, res) => {
  try {
    console.log("Received study material data:", req.body);

    const material = await StudyMaterial.create(req.body);

    console.log("Study material created successfully:", material);

    res.status(201).json({
      success: true,
      message: "Study material created successfully",
      data: material,
    });
  } catch (error) {
    console.error("Error creating study material:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating study material",
      error: error.message,
    });
  }
};

// Update study material
exports.updateMaterial = async (req, res) => {
  try {
    console.log("Updating study material:", req.params.id);
    console.log("Update data:", req.body);

    const material = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }

    console.log("Study material updated successfully:", material);

    res.status(200).json({
      success: true,
      message: "Study material updated successfully",
      data: material,
    });
  } catch (error) {
    console.error("Error updating study material:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating study material",
      error: error.message,
    });
  }
};

// Delete study material (soft delete)
exports.deleteMaterial = async (req, res) => {
  try {
    console.log("Deleting study material:", req.params.id);

    const material = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }

    console.log("Study material deleted successfully:", material);

    res.status(200).json({
      success: true,
      message: "Study material deleted successfully",
      data: material,
    });
  } catch (error) {
    console.error("Error deleting study material:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting study material",
      error: error.message,
    });
  }
};
