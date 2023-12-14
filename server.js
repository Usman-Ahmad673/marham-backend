const app = require('./app')
// const PORT = 4000
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary')


const connectDatabase = require('./config/database')



process.on('uncaughtException' , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})





connectDatabase()



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const server = app.listen(process.env.PORT , () => {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
})





//Unhandled Promise Rejection
process.on('unhandledRejection' , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhangled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})