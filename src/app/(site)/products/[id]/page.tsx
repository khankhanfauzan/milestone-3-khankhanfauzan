import { Badge } from "@/components/ui/badge";
import { fetchProductById } from "@/services/api";
import AddToCartAction from "@/components/AddToCartAction";
import ProductGallery from "@/components/ProductGallery";
import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import { Props } from "@/types/param";

async function page({ params }: Props) {
    const getParams = await params;

    const product = await fetchProductById(Number(getParams.id)).catch(
        () => null,
    );
    if (!product) return notFound();

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <BackButton />
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <ProductGallery
                        images={product.images}
                        title={product.title}
                    />
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
                            <p className="text-base leading-relaxed text-neutral-400">
                                {product.description}
                            </p>
                        </div>
                        <div className="mt-10">
                            <AddToCartAction product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;

