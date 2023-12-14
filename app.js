const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const cors = require('cors') 
// const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')




app.use(cors());
app.use(fileUpload());
app.use(express.json())
app.use(cookieParser())
app.use(
        bodyParser.urlencoded({
            extended: true,
            limit: '3500000000mb',
            parameterLimit: 5000000000000,
        }),
);

//Routes
const doctorRoute = require('./routes/doctorRoute')
const hospitalRoute = require('./routes/hospitalRoute')
const labRoute = require('./routes/labRoute')
const symptomRoute = require('./routes/symptomRoute')
const diseaseRoute = require('./routes/diseaseRoute')
const userRoute = require('./routes/userRouter')
const postRoute = require('./routes/postRoute')
const doctorAppointmentRoute = require('./routes/Admin/doctorAppointmentRoute')
const paymentRoute = require('./routes/Admin/paymentRoute')
const surgeonAppointmentRoute = require('./routes/Admin/surgeonAppointmentRoute')
const productRoute = require('./routes/Admin/productRoute')
const orderRoute = require('./routes/Admin/orderRoute')


app.use('/api/v1',doctorRoute)
app.use('/api/v1',hospitalRoute)
app.use('/api/v1',labRoute)
app.use('/api/v1',symptomRoute)
app.use('/api/v1',diseaseRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',postRoute)
app.use('/api/v1',doctorAppointmentRoute)
app.use('/api/v1',surgeonAppointmentRoute)
app.use('/api/v1',paymentRoute)
app.use('/api/v1',productRoute)
app.use('/api/v1',orderRoute)




app.use(errorMiddleware)

module.exports = app