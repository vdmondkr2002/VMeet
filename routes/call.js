const express = require('express')
const router = express.Router()

const {createLink,checkJoinCall} = require('../controllers/call')
const auth = require('../middleware/auth')


router.get('/createlink',auth,createLink)
router.post('/checkjoincall',auth,checkJoinCall)

module.exports = router;