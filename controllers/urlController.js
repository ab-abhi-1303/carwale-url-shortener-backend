const Url = require("../models/Url");
const validateUrl = require("../utils/utils");

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ status: "error", message: "Invalid URL format" });
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(200).json({
        status: "success",
        data: { shortUrl: `${process.env.BASE_URL}/${url.shortId}` },
      });
    }

    // Generate short ID and save
    const shortId = Math.random().toString(36).substring(2, 8);
    url = new Url({ originalUrl, shortId });
    await url.save();

    return res.status(201).json({
      status: "success",
      data: { shortUrl: `${process.env.BASE_URL}/${shortId}` },
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};


exports.redirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOne({ shortId: id });

    if (!url) {
      return res.status(404).json({ status: "error", message: "URL not found" });
    }

    url.clickCount++;
    await url.save();
    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};


exports.getAnalytics = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOne({ shortId: id });

    if (!url) {
      return res.status(404).json({ status: "error", message: "URL not found" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
        clickCount: url.clickCount,
        createdAt: url.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};


exports.getAllAnalytics = async (req, res) => {
  try {
    // Fetch all URLs
    const urls = await Url.find({}, "originalUrl shortId clickCount createdAt");

    return res.status(200).json({
      status: "success",
      data: urls,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch analytics",
    });
  }
};
