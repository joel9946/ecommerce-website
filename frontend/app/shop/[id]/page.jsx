import ProductDetailClient from './ProductDetailClient';
import { ALL_PRODUCTS } from '@/lib/products';

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({ params }) {
  return <ProductDetailClient params={params} />;
}
