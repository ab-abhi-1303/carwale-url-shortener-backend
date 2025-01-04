const express = require('express');
const { shortenUrl, redirectUrl, getAnalytics, getAllAnalytics, doHeavyOperation } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:id', redirectUrl);
router.get('/analytics/all', getAllAnalytics);
router.get('/analytics/:id', getAnalytics);
router.get('/heavy/op', doHeavyOperation);

module.exports = router;
