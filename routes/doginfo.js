const express = require('express');
const doginfoController = require("../controllers/doginfo");
const dogRecordController = require('../controllers/doginfo');

const router = express.Router();

router.post('/receive-doginfo',doginfoController.savedoginfo);
router.post('/receive-dogrecord', doginfoController.savedogrecords);
router.get('/:date/:user_id', dogRecordController.getDogRecords);

module.exports = router;