const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: '3'},
  type: { type: String, required: true, minLength: '3'},
  description: { type: String, required: true, minLength: '3'},
  skill1: { type: String, required: false},
  skill2: { type: String, required: false},
  skill3: { type: String, required: false},
  // likes: { type: Number, required: false}
})

module.exports = mongoose.model('Pet', petSchema);
