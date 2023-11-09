const mongoose = require("mongoose")
const novelSchema = mongoose.Schema({
novel_name: String,
novel_author: String,
novel_pages: Number
})
module.exports = mongoose.model("novel",novelSchema)