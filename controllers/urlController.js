const Url = require('../models/Url');
const validateUrl = require('../utils/utils');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Check if URL already exists in the database
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(200).json({ shortUrl: `${process.env.BASE_URL}/${url.shortId}` });
    }

    // Generate short ID and save to database
    const shortId = Math.random().toString(36).substring(2, 8); // Example short ID generator
    url = new Url({ originalUrl, shortId });
    await url.save();

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOne({ shortId: id });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clickCount++;
    await url.save();
    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getAnalytics = async (req, res) => {
    const { id } = req.params;
  
    try {
      const url = await Url.findOne({ shortId: id });
  
      if (!url) {
        return res.status(404).json({ error: 'URL not found' });
      }
  
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
        clickCount: url.clickCount,
        createdAt: url.createdAt,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  };