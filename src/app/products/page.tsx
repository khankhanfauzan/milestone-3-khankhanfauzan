"use client";

import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { fetchCategories, fetchProducts } from "@/services/api";
import { Category, Product } from "@/types/product";
import { useState, useEffect } from "react";

function page() {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));

        fetchCategories()
            .then(setCategories)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <div className="p-20 text-center animate-pulse">Loading...</div>;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
                <h1 className="text-4xl mb-8">New Arrival</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => {}}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-4xl mb-8">Categories</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default page;
