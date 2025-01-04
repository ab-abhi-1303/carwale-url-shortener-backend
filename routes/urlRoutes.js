const express = require('express');
const { shortenUrl, redirectUrl, getAnalytics } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:id', redirectUrl);
router.get('/analytics/:id', getAnalytics);

module.exports = router;
