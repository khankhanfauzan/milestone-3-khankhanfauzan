import FAQCard from "@/components/FAQCard";
import { fetchFaqs } from "@/services/api";
import { FAQ } from "@/types/faq";

async function page() {
    const { items, generatedAt } = await fetchFaqs();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
            <p className="text-neutral-400">
                Page generated at: <strong>{generatedAt}</strong>
            </p>
            <hr />

            <div className="w-full mt-8">
                {items.map((post: FAQ) => (
                    <FAQCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default page;

