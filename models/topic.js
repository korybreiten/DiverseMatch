const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  user: String,
  title: { type: String, unique: true },
  icon: String,
  description: String
})

module.exports = mongoose.model('Topic', topicSchema);