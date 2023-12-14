const express = require('express')
const { getSurgeonAppointments, createSurgeonAppointment } = require('../../controllers/Admin/surgeonAppointmentController')

const router = express.Router()

router.route('/surgeonAppointments').get(getSurgeonAppointments)
router.route('/surgeonAppointment/new').post(createSurgeonAppointment)

module.exports = router