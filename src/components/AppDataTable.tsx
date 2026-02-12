import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { fetchProducts } from "@/services/api";
import SafeImage from "./SafeImage";

import AppProductActions from "./AppProductActions";
import Link from "next/link";

async function AppDataTable() {
    const products = await fetchProducts();

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Input
                    id="search-input"
                    placeholder="Search..."
                    type="search"
                />
                <Link href="/admin/products/add">
                    <Button variant={"outline"}>
                        <PlusIcon />
                        <span>Add Product</span>
                    </Button>
                </Link>
            </div>
            <div className="mt-8 overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <SafeImage
                                        className="rounded-sm"
                                        src={product.images[0]}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                    />
                                </TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>
                                    <AppProductActions id={product.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default AppDataTable;
