const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  name: String,
  type: String,
  desc: String,
  cover: String,
  images: [String],
})

module.exports = mongoose.model('Item', ItemSchema)
