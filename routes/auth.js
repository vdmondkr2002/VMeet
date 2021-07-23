const express = require('express')
const router = express.Router()
const {googleSignIn} = require('../controllers/auth')

router.post('/google',googleSignIn);

module.exports = router;