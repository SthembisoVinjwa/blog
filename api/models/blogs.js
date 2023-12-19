const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0},
  author: { type:  Schema.Types.ObjectId, ref: "User", required: true},
  blogImage: { type: String, require: true}
})

const blog = mongoose.model('Blog', blogSchema)

module.exports = blog
