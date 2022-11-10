const mongoose = require("mongoose")
const flightSchema = mongoose.Schema({
flightName: String,
flightType: String,
price: Number
})

module.exports = mongoose.model("Flight",
flightSchema)