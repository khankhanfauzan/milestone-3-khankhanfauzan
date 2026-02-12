"use client";

import CategoryCard from "@/components/CategoryCard";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { fetchCategories, fetchProducts } from "@/services/api";
import { Category, Product } from "@/types/product";
import { useState, useEffect } from "react";

function page() {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {error && <div className="mb-4 text-red-500">Error: {error}</div>}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default page;

