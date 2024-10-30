"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setIsDarkMode(true);
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("darkMode", newMode);
            document.body.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            <Link href="/" className="text-white text-xl font-bold">
                Fake Store
            </Link>
            <div>
                <Link href="/" className="text-white ml-4">Home</Link>
                <Link href="/all-products" className="text-white ml-4">All Products</Link>
                <Link href="/cart" className="text-white ml-4">Cart</Link>
                <button onClick={toggleDarkMode} className="text-white ml-4">
                    {isDarkMode ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
