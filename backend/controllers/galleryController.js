const Gallery = require("../models/Gallery");

// Get all gallery images (with filters)
exports.getAllImages = async (req, res) => {
  try {
    const { category, isFeatured, isActive = true } = req.query;

    let query = { isActive };

    if (category) {
      query.category = category;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    const images = await Gallery.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery images",
      error: error.message,
    });
  }
};

// Get single image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Increment views
    image.views += 1;
    await image.save();

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching image",
      error: error.message,
    });
  }
};

// Get featured images
exports.getFeaturedImages = async (req, res) => {
  try {
    const images = await Gallery.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching featured images:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured images",
      error: error.message,
    });
  }
};

// Get images by category
exports.getImagesByCategory = async (req, res) => {
  try {
    const images = await Gallery.find({
      isActive: true,
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching images by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching images by category",
      error: error.message,
    });
  }
};

// Create new gallery image
exports.createImage = async (req, res) => {
  try {
    console.log("Received gallery image data:", req.body);

    const image = await Gallery.create(req.body);

    console.log("Gallery image created successfully:", image);

    res.status(201).json({
      success: true,
      message: "Gallery image created successfully",
      data: image,
    });
  } catch (error) {
    console.error("Error creating gallery image:", error);

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
      message: "Error creating gallery image",
      error: error.message,
    });
  }
};

// Update gallery image
exports.updateImage = async (req, res) => {
  try {
    console.log("Updating gallery image:", req.params.id);
    console.log("Update data:", req.body);

    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    console.log("Gallery image updated successfully:", image);

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      data: image,
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);

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
      message: "Error updating gallery image",
      error: error.message,
    });
  }
};

// Delete gallery image (soft delete)
exports.deleteImage = async (req, res) => {
  try {
    console.log("Deleting gallery image:", req.params.id);

    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    console.log("Gallery image deleted successfully:", image);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
      data: image,
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting gallery image",
      error: error.message,
    });
  }
};

// Increment likes
exports.likeImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error liking image:", error);
    res.status(500).json({
      success: false,
      message: "Error liking image",
      error: error.message,
    });
  }
};
