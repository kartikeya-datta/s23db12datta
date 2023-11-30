const mongoose = require("mongoose")
const novelSchema = mongoose.Schema({
novel_name: {
    type:String,
    required:true,
    match:/^[a-zA-Z]+$/
},
novel_author: String,
novel_pages: {
    type:Number,
    min:1,
    max:150
}
})
module.exports = mongoose.model("novel",novelSchema)