import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  images: [{ type: String }],
  variants: [{
    size: { type: String },
    color: { type: String },
    stock: { type: Number, default: 0 }
  }],
  tags: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
