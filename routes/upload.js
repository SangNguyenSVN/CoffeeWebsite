const express = require('express');
const uploadAPI = require('../api/upload');
const uploadCloudinary = require('../api/uploadCloudinary');

const router = express.Router();

router.use('/', uploadAPI);
router.use('/cloud', uploadCloudinary);


module.exports = router;
