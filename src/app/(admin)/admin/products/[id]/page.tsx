import AppProductForm from "@/components/AppProductForm";
import { fetchProductById } from "@/services/api";
import { Props } from "@/types/param";

async function page({ params }: Props) {
    const getParams = await params;
    const product = await fetchProductById(Number(getParams.id));

    return (
        <div className="max-w-7xl p-4">
            <AppProductForm product={product} />
        </div>
    );
}

export default page;
