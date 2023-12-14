const ErrorHandler = require('../../utils/errorHandler')
const catchAsyncError = require('../../middleware/catchAsyncError')
const SurgeonAppointment = require('../../models/Admin/SurgeonAppointmentModel')



exports.createSurgeonAppointment = catchAsyncError(async (req, res, next) => {
    try {
        const surgeonAppointment = await SurgeonAppointment.create(req.body);

        res.status(201).json({
            success: true,
            surgeonAppointment,
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the surgeonAppointment.",
        });
    }
});



exports.getSurgeonAppointments = catchAsyncError(async (req, res, next) => {
    try {
        const surgeonAppointments = await SurgeonAppointment.find();

        const surgeonAppointmentCount = await SurgeonAppointment.countDocuments();

        res.status(200).json({
            success: true,
            surgeonAppointments,
            surgeonAppointmentCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});