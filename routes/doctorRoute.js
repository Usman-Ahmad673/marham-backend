const express = require('express')
const {createDoctor, getDoctors, updateDoctor, deleteDoctor, getSingleDoctor, getDoctorBySearch, getSingleDoctorById} = require('../controllers/doctorController')

const router = express.Router()

router.route('/doctors').get(getDoctors)
router.route('/doctors/search').get(getDoctorBySearch)
router.route('/doctor/new').post(createDoctor)
router.route('/doctor/:id').put(updateDoctor).delete(deleteDoctor).get(getSingleDoctor)
router.route('/doctor/id/:id').get(getSingleDoctorById)
module.exports = router