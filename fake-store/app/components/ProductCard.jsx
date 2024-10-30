"use client";
import { useRouter } from "next/navigation";

const ProductCard = ({ product, onAddToCart }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="product-card p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover mb-2 cursor-pointer"
        onClick={handleNavigate}
      />
      <h2 className="text-lg cursor-pointer" onClick={handleNavigate}>
        {product.title}
      </h2>
      <p className="text-lg font-semibold">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 text-white p-2 mt-2 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
