"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";

function ProductGallery({
    images,
    title,
}: {
    images: string[];
    title: string;
}) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-sm">
                <SafeImage
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={title}
                    className="h-full w-full object-cover transition-opacity duration-300"
                />
            </div>
            <div className="flex gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                            activeImage === index
                                ? "border-blue-600 ring-1 ring-blue-500"
                                : "border-transparent opacity-60"
                        }`}
                    >
                        <SafeImage
                            src={img}
                            alt={`${title} thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductGallery;
