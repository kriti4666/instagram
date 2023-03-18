const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Database connected successfully')
    } catch (error) {
        console.log("error while connecting with Database", error)
    }
    return mongoose.connect(process.env.DB_URL)
}

module.exports = ConnectDB;