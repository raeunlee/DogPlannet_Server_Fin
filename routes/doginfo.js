const express = require('express');
const doginfoController = require("../controllers/user");

const router = express.Router();

router.post('/receive-doginfo',doginfoController.savedoginfo);
router.post('/receive-dogrecord', doginfoController.savedogrecords);
router.get('/:date', dataController.getByDate);

module.exports = router;