import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  baseProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  designUrl: { type: String, required: true },
  placement: { type: String, enum: ['Front', 'Back', 'Sleeve'], default: 'Front' },
  color: String,
  size: String,
  qty: { type: Number, default: 1 },
  notes: String,
  status: { type: String, enum: ['Pending Approval', 'Approved', 'Rejected', 'In Production', 'Shipped'], default: 'Pending Approval' }
}, { timestamps: true });

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);
export default CustomOrder;
