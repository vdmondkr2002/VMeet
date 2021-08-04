const mongoose = require('mongoose')

const CallSchema = new mongoose.Schema({
  adminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  people: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    }
  ],
  peopleSocketIds: [
    String
  ]
})

module.exports = mongoose.model('Call', CallSchema)