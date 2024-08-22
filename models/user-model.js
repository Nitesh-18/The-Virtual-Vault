const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   discount: Number,
//   image: Buffer,
//   quantity: { type: Number, default: 1 },
//   // any other fields...
// });

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
      default: [],
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
