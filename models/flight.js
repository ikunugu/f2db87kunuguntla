const mongoose = require("mongoose")
const flightSchema = mongoose.Schema({
flightName:{
    type: String,
    required:true,
},
flightType:{
    type: String,
    required:true,
},
price:{
    type: Number,
    required:true,
    min:1,
    max:200000
}
})

module.exports = mongoose.model("Flight",
flightSchema)