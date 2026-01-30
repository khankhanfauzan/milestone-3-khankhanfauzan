import { Category } from "@/types/product";
import SafeImage from "./SafeImage";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/categories/${category.id}`}>
            <div className="relative hover:opacity-90 transition">
                <SafeImage
                    className="rounded-lg aspect-video object-cover"
                    src={category.image}
                    alt={category.name}
                />

                <Badge
                    variant="secondary"
                    className="absolute top-0 left-0 m-2"
                >
                    {category.name}
                </Badge>
            </div>
        </Link>
    );
}

export default CategoryCard;
