"use client";

import useCart from "@/app/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchProductById } from "@/services/api";
import { Product } from "@/types/product";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function page() {
    const { cart, add, updateQty } = useCart();

    const { id } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    const cartItem = cart.find((item) => item.id === product?.id);

    useEffect(() => {
        if (id) {
            fetchProductById(Number(id))
                .then(setProduct)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading)
        return <div className="p-20 text-center animate-pulse">Loading...</div>;

    if (!product)
        return <div className="p-20 text-center">Product not found.</div>;

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center text-sm font-semibold  hover:text-blue-600 transition-colors"
                >
                    ← Back
                </button>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Image */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-3xl shadow-sm">
                            <img
                                src={product.images[activeImage]}
                                alt={product.title}
                                className="h-full w-full object-cover transition-opacity duration-300"
                            />
                        </div>
                        <div className="flex gap-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                                        activeImage === index
                                            ? "border-blue-600 ring-1 ring-blue-500"
                                            : "border-transparent opacity-60"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col justify-center items-start">
                        <nav className="mb-4">
                            <Badge variant="secondary">
                                {product.category.name}
                            </Badge>
                        </nav>

                        <h1 className="text-4xl font-extrabold  sm:text-5xl">
                            {product.title}
                        </h1>

                        <div className="mt-6">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl font-bold tracking-tight ">
                                ${product.price}
                            </p>
                        </div>

                        <div className="mt-6 space-y-6">
                            <p className="text-base leading-relaxed text-neutral-300">
                                {product.description}
                            </p>
                        </div>
                        <div className="mt-10">
                            {!cartItem ? (
                                <Button
                                    className="py-4 w-full px-8"
                                    onClick={() => add(product)}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <div className="flex items-center gap-4  p-2 rounded-xl ">
                                    <Button
                                        onClick={() =>
                                            updateQty(product.id, -1)
                                        }
                                        className="w-12 h-12 flex items-center justify-center"
                                    >
                                        -
                                    </Button>

                                    <input
                                        type="number"
                                        value={cartItem.quantity}
                                        readOnly
                                        className="w-12 text-center bg-transparent font-bold text-xl outline-none"
                                    />

                                    <Button
                                        onClick={() => updateQty(product.id, 1)}
                                        className="w-12 h-12 flex items-center justify-center"
                                    >
                                        +
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
