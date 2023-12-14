const express = require('express')
const { getDoctorAppointments, createAppointment } = require('../../controllers/Admin/doctorAppointmentController')

const router = express.Router()

router.route('/doctorAppointments').get(getDoctorAppointments)
router.route('/doctorAppointment/new').post(createAppointment)

module.exports = router