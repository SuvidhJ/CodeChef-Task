"use client";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, priceRange, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h1 className="text-2xl font-bold my-4">All Products</h1>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div>
                        <label className="mr-2">Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-black"
                        >
                            <option value="">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>
                    </div>
                    <div>
                        <label className="mr-2">Price Range:</label>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                            placeholder="Min"
                            className="mr-2 text-black"
                        />
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                            placeholder="Max"
                            className="mr-2 text-black"
                        />
                    </div>

                    <ProductList products={currentProducts} />
                    <div className="flex justify-center mt-4">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 p-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProductsPage;
