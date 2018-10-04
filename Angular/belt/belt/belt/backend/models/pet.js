const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], minlength:[3, 'Name has to be at least 3 characters']},
  type: { type: String, required: [true, 'Type is required'], minlength:[3, 'Type has to be at least 3 characters']},
  description: { type: String, required: [true, 'Description is required'], minlength: [3, 'Description has to be at least 3 characters']},
  skill1: { type: String, required: false},
  skill2: { type: String, required: false},
  skill3: { type: String, required: false},
  // likes: { type: Number, required: false}
})

module.exports = mongoose.model('Pet', petSchema);
