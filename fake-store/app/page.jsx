"use client";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Loader from "./components/Loader";

const HomePage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const sortedProducts = data.sort((a, b) => b.rating.rate - a.rating.rate);
      setTopProducts(sortedProducts.slice(0, 5));
      setLoading(false);
    };

    fetchTopProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  const handleAddToCart = (product) => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      alert("Product added to cart!");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-blue-600 text-white p-8 text-center">
            <h1 className="text-4xl font-bold">Welcome to Our Store!</h1>
            <p className="mt-4">Discover amazing products at great prices.</p>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold align-center my-4">
              Top Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
