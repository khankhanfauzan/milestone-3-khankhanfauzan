"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "@/types/product";
import { useForm } from "react-hook-form";
import SafeImage from "./SafeImage";
import { fetchCategories, updateProductById } from "@/services/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

type ProductFormValues = {
    title: string;
    description: string;
    categoryId: number;
    price: number;
};

function AppProductForm({ product }: { product: Product }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [imageInputs, setImageInputs] = useState<string[]>(product.images);
    const [imageError, setImageError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<ProductFormValues>({
        defaultValues: {
            title: product.title,
            description: product.description,
            price: product.price,
            categoryId: product.category.id,
        },
    });

    const selectedCategoryId = watch("categoryId");

    const onSubmitForm = async (data: ProductFormValues) => {
        const cleanedImages = imageInputs
            .map((url) => url.trim())
            .filter((url) => url.length > 0);

        if (cleanedImages.length === 0) {
            setImageError("At least one image URL is required");
            return;
        }

        setImageError(null);

        const payload = {
            title: data.title,
            price: data.price,
            categoryId: data.categoryId,
            description: data.description,
            images: cleanedImages,
        };

        try {
            setIsLoading(true);
            await updateProductById(product.id, payload);
            router.push("/admin/products");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                        id="title"
                        type="text"
                        placeholder="product title"
                        title="please enter a product title"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Title must be at least 3 characters",
                            },
                        })}
                    />
                    {errors.title && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.title.message}
                        </div>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        title="please enter a product price"
                        {...register("price", {
                            valueAsNumber: true,
                            required: "Price is required",
                            min: {
                                value: 0.01,
                                message: "Price must be greater than 0",
                            },
                        })}
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.price && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.price.message}
                        </div>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select
                        value={
                            selectedCategoryId
                                ? String(selectedCategoryId)
                                : undefined
                        }
                        onValueChange={(value) =>
                            setValue("categoryId", Number(value))
                        }
                    >
                        <SelectTrigger id="category">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={`${category.id}`}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                        id="description"
                        placeholder="product description"
                        title="please enter a product description"
                        rows={5}
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message:
                                    "Description must be at least 10 characters",
                            },
                        })}
                    />
                    {errors.description && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.description.message}
                        </div>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="images">Images</FieldLabel>

                    <div className="flex flex-col gap-2">
                        {imageInputs.map((value, index) => {
                            const trimmed = value.trim();

                            return (
                                <div
                                    key={`${index}-${value}`}
                                    className="flex items-center gap-2"
                                >
                                    {trimmed && (
                                        <SafeImage
                                            src={trimmed}
                                            alt={product.title}
                                            width={64}
                                            height={64}
                                            className="rounded-sm border border-neutral-800 object-cover aspect-square"
                                        />
                                    )}
                                    <Input
                                        id={index === 0 ? "images" : undefined}
                                        type="url"
                                        placeholder="https://placehold.co/600x400"
                                        value={value}
                                        onChange={(e) => {
                                            const next = [...imageInputs];
                                            next[index] = e.target.value;
                                            setImageInputs(next);
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            if (imageInputs.length === 1) {
                                                return;
                                            }
                                            const next = [...imageInputs];
                                            next.splice(index, 1);
                                            setImageInputs(next);
                                        }}
                                        disabled={imageInputs.length === 1}
                                    >
                                        ×
                                    </Button>
                                </div>
                            );
                        })}

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setImageInputs((prev) => [...prev, ""])
                            }
                        >
                            + Add Image
                        </Button>
                    </div>

                    {imageError && (
                        <div className="text-sm text-red-500 mt-1">
                            {imageError}
                        </div>
                    )}
                </Field>
                <Button type="submit">
                    {isLoading ? "Submiting..." : "Submit"}
                </Button>
            </FieldGroup>
        </form>
    );
}

export default AppProductForm;
