const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {caesarBruteforce, getCeaserUsers} = require('../controllers/bruteforces/ceaserBruteforce')
const { monoalphabeticBruteforce, getMonoalphabeticUsers } = require('../controllers/bruteforces/monoalphabeticBruteforce')
const { playfairBruteforce } = require('../controllers/bruteforces/playfairBruteforce')

router.use(requireAuth)

router.post('/ceasar',caesarBruteforce)
router.post('/monoalphabetic',monoalphabeticBruteforce)
router.post('/playfair',playfairBruteforce)
// router.post('/hill',)

router.get('/ceasar',getCeaserUsers)
router.get('/monoalphabetic',getMonoalphabeticUsers)


module.exports = router