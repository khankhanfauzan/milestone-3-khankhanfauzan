import axios from "axios";
import { Category, Product, ProductPayload } from "../types/product";
import { LoginResponse, UserProfile } from "@/types/auth";
import { storage } from "@/services/storage";

const STORE_API = "https://api.escuelajs.co/api/v1";
const JSON_API = "https://jsonplaceholder.typicode.com";

export const api = axios.create({
    baseURL: STORE_API,
});



// Products

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Product not found");

    return res.json();
};

export const fetchProductsByCategory = async (
    id: number,
): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/categories/${id}/products`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Product by category not found");

    return res.json();
};

export const fetchProductByTitle = async (
    title: string,
): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/products/?title=${title}`);

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
}

export const updateProductById = async (
    id: number,
    payload: ProductPayload,
): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
};

export const deleteProductById = async (id: number) => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) throw new Error("Failed to delete product");

    return res.json();
};

// Categories

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${STORE_API}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
};

// Auth

export const loginUser = async (credential: any): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credential);
    return data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const token = storage.getToken();
    const { data } = await api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// FAQ

export const fetchFaqs = async () => {
    const res = await fetch(`${JSON_API}/posts?_limit=10`, {
        cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch FAQs");
    const data = await res.json();

    return { items: data, generatedAt: new Date().toLocaleString() };
};
