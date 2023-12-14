const express = require('express')
const { createSymptom, getSymptoms, getSingleSymptom } = require('../controllers/symptomController')

const router = express.Router()

router.route('/symptoms').get(getSymptoms)
router.route('/symptom/new').post(createSymptom)
router.route('/symptom/:id').get(getSingleSymptom)

module.exports = router