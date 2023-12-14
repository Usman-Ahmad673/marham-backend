const ErrorHandler = require('../../utils/errorHandler')
const catchAsyncError = require('../../middleware/catchAsyncError')
const DoctorAppointment = require('../../models/Admin/doctorAppointmentModel')
const cloudinary = require('cloudinary')



exports.createAppointment = catchAsyncError(async (req, res, next) => {
    try {
        const doctorAppointment = await DoctorAppointment.create(req.body);

        res.status(201).json({
            success: true,
            doctorAppointment,
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the doctorAppointment.",
        });
    }
});



exports.getDoctorAppointments = catchAsyncError(async (req, res, next) => {
    try {
        const doctorAppointments = await DoctorAppointment.find();

        const doctorAppointmentCount = await DoctorAppointment.countDocuments();

        res.status(200).json({
            success: true,
            doctorAppointments,
            doctorAppointmentCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});