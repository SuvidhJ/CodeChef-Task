"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
    const loaderRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            loaderRef.current,
            { rotation: 0 },
            { rotation: 360, duration: 1, repeat: -1, ease: "linear" }
        );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-800">
            <div
                ref={loaderRef}
                className="loader border-t-4 border-blue-600 rounded-full w-16 h-16"
            />
            <p className="mt-2 text-xl text-gray-800 dark:text-gray-200">Loading...</p>
        </div>
    );
};

export default Loader;
