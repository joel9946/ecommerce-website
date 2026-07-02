import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    size: String,
    color: String,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentId: String,
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'], default: 'Placed' },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
