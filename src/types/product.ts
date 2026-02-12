export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    creationAt?: string;
    updatedAt?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export type ProductPayload = {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
};