const mongoose = require("mongoose")

async function dbConnect() {
    try {
        return await mongoose.connect(process.env.DB_URL)
    } catch (err) {
        return err
    }
}

module.exports = dbConnect