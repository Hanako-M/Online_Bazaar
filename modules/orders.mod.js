const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderschema = new Schema({
    totalprice: {
      type: Number,
      required: true,
      default: 0
    },
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'customers', // or 'users' if that's your actual model
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'pending'
    }
  });
const order = mongoose.model('orders', orderschema)
module.exports = order  