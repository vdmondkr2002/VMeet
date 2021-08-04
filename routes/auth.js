const express = require('express')
const router = express.Router()
const {googleSignIn,getCurrentUser} = require('../controllers/auth')

const auth = require('../middleware/auth')

router.get('/user',auth,getCurrentUser)
router.post('/google',googleSignIn);


module.exports = router;