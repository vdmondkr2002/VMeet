const express = require('express')
const router = express.Router()
const {googleSignIn,getCurrentUser} = require('../controllers/auth')
const {createLink} = require('../controllers/call')
const auth = require('../middleware/auth')

router.get('/user',auth,getCurrentUser)
router.post('/google',googleSignIn);
router.get('/createlink',auth,createLink)

module.exports = router;