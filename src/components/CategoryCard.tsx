import { Category } from "@/types/product";
import SafeImage from "./SafeImage";
import { Badge } from "./ui/badge";

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="relative hover:opacity-90 transition">
            <SafeImage
                className="rounded-lg aspect-square object-cover"
                src={category.image}
                alt={category.name}
            />

            <Badge variant="secondary" className="absolute top-0 left-0 m-2">
                {category.name}
            </Badge>
        </div>
    );
}

export default CategoryCard;
