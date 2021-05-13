const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
  },
    email: {
      type: String,
      required: true,
    },
    shoppingCart: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lipstick'
    }],
  })


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
