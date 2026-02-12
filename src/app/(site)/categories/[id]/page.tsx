import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import { fetchProductsByCategory } from "@/services/api";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;

    const products = await fetchProductsByCategory(Number(id));

    if (!products || products.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold">
                    No products found for this category.
                </h2>
                <BackButton />
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <BackButton />
            <header className="mb-8">
                <h1 className="text-4xl font-bold">
                    {products[0].category.name}
                </h1>
                <p className="text-neutral-500">
                    Browsing all items in this category
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}

