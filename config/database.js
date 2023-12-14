const mongoose = require('mongoose')


// fYIxex5EQgYOta9N

// "mongodb+srv://marham:oe7YUTeODwan7qUc@cluster0.jj2hz5u.mongodb.net/?retryWrites=true&w=majority",
// "mongodb://127.0.0.1:27017/marhamClone", 

const connectDatabase = () => {

    mongoose.connect("mongodb+srv://itsusmanahmad00:PAiXSm5lJovtoHIG@marham.bxjdrgd.mongodb.net/?retryWrites=true&w=majority",
                    {
                        useNewUrlParser:true,
                        useUnifiedTopology:true
                    }
                    ).then((data) => {
                        console.log(`Successfully connected to database at Server : ${data.connection.host}`);
                    }).catch(err => {
                        console.log(`Error connecting to database: ${err.message}`);
                    })

}

module.exports = connectDatabase