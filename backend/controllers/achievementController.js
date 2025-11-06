const Achievement = require("../models/Achievement");

// Get all achievements (with filters)
exports.getAllAchievements = async (req, res) => {
  try {
    const {
      category,
      achieverType,
      isFeatured,
      isActive = true,
      year,
    } = req.query;

    let query = { isActive };

    if (category) {
      query.category = category;
    }

    if (achieverType) {
      query.achieverType = achieverType;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (year) {
      query.year = year;
    }

    const achievements = await Achievement.find(query).sort({
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: error.message,
    });
  }
};

// Get single achievement by ID
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    console.error("Error fetching achievement:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching achievement",
      error: error.message,
    });
  }
};

// Get featured achievements
exports.getFeaturedAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error("Error fetching featured achievements:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured achievements",
      error: error.message,
    });
  }
};

// Get achievements by category
exports.getAchievementsByCategory = async (req, res) => {
  try {
    const achievements = await Achievement.find({
      isActive: true,
      category: req.params.category,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error("Error fetching achievements by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching achievements by category",
      error: error.message,
    });
  }
};

// Create new achievement
exports.createAchievement = async (req, res) => {
  try {
    console.log("Received achievement data:", req.body);

    const achievement = await Achievement.create(req.body);

    console.log("Achievement created successfully:", achievement);

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Error creating achievement:", error);

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
      message: "Error creating achievement",
      error: error.message,
    });
  }
};

// Update achievement
exports.updateAchievement = async (req, res) => {
  try {
    console.log("Updating achievement:", req.params.id);
    console.log("Update data:", req.body);

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    console.log("Achievement updated successfully:", achievement);

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Error updating achievement:", error);

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
      message: "Error updating achievement",
      error: error.message,
    });
  }
};

// Delete achievement (soft delete)
exports.deleteAchievement = async (req, res) => {
  try {
    console.log("Deleting achievement:", req.params.id);

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    console.log("Achievement deleted successfully:", achievement);

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting achievement",
      error: error.message,
    });
  }
};
