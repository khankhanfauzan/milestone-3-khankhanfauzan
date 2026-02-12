"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchCategories, fetchProducts } from "@/services/api";
import { Category, Product } from "@/types/product";
import { useState, useEffect } from "react";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));

        fetchCategories()
            .then(setCategories)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
            {error && (
                <div className="w-full px-8 mb-4 text-red-500">
                    Error: {error}
                </div>
            )}
            <div className="w-full">
                <div className="flex flex-row justify-between mb-2 w-full px-8">
                    <h1 className="text-2xl font-semibold ">New Arrival</h1>
                    <Link href="/products">
                        <Button variant="ghost">See All</Button>
                    </Link>
                </div>

                <div className="w-full px-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {products.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="mt-8 w-full">
                <div className="flex flex-row justify-between mb-2 w-full px-8">
                    <h1 className="text-2xl font-semibold ">Categories</h1>
                    {/* <Link href="/">
                        <Button variant="ghost">See All</Button>
                    </Link> */}
                </div>

                <div className="w-full px-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {categories.map((category) => (
                                <CarouselItem
                                    key={category.id}
                                    className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <CategoryCard category={category} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
