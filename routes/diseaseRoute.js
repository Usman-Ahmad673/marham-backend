const express = require('express')
const { getDiseases, createDisease , getSingleDisease } = require('../controllers/diseaseController')

const router = express.Router()

router.route('/diseases').get(getDiseases)
router.route('/disease/:id').get(getSingleDisease)
router.route('/disease/new').post(createDisease)

module.exports = router