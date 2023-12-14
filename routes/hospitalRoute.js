const express = require('express')
const { createHospital, getHospitals, updateHospital, deleteHospital, getSingleHospital, getSingleHospitalById } = require('../controllers/hospitalController')

const router = express.Router()

router.route('/hospital').get(getHospitals)
router.route('/hospital/new').post(createHospital)
router.route('/hospital/:id').put(updateHospital).delete(deleteHospital).get(getSingleHospital)
router.route('/hospitalbyid/:id').get(getSingleHospitalById)

module.exports = router