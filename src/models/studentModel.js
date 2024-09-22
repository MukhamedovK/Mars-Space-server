const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'default_avatar.jpg',
  },
  coinBalance: {
    type: Number,
    default: 0,
  },
  teacher: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  }
});


module.exports = mongoose.model('Students', StudentSchema);