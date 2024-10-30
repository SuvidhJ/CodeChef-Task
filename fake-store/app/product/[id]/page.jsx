"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation";
const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch product");
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]); 
    if (loading) return <p>Loading...</p>; 
    if (!product) return <p>Product not found.</p>; 

    return (
        <div className=" product-detail p-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        </div>
    );
};

export default ProductDetailPage;
