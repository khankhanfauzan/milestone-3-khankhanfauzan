import { Product } from "@/types/product";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`}>
            <div className="rounded-lg border border-neutral-600 overflow-hidden bg-neutral-800 flex flex-col h-full hover:opacity-90 transition">
                <div className="relative">
                    <SafeImage
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full aspect-square object-cover"
                    />
                    <Badge
                        variant="secondary"
                        className="absolute top-0 left-0 m-2"
                    >
                        {product.category.name}
                    </Badge>
                </div>
                <div className="p-4 justify-between">
                    <h3 className="text-xl font-semibold mb-2 truncate">
                        {product.title}
                    </h3>
                    <h3 className="text-2xl font-semibold mb-2">{`$${product.price}`}</h3>
                    <p className="truncate">{product.description}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
