"use client";

import CartCard from "@/components/CartCard";
import { useState } from "react";
import useCart from "../../../hooks/useCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function page() {
    const { cart, updateQty, remove } = useCart();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null);

    const handleRemove = (id: number) => {
        setPendingRemoveId(id);
        setConfirmOpen(true);
    };

    const tax = 0.11;
    const taxPercentage = tax * 100;

    const subTotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );
    const subTax = subTotal * tax;
    const total = subTotal + subTax;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link href="/">
                    <Button variant="secondary">Go Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl mb-8 font-semibold">Cart</h1>
            <div className="grid md:grid-cols-12 gap-8">
                <div className="col-span-8">
                    {cart.map((item) => (
                        <CartCard
                            key={item.id}
                            item={item}
                            onRemove={handleRemove}
                            onUpdateQty={updateQty}
                        />
                    ))}
                </div>
                <div className="col-span-4 w-full rounded-lg flex flex-col p-4 bg-neutral-800 min-h-80 min-w-80">
                    <h3 className="text-xl font-semibold">Summary</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex justify-between text-neutral-400">
                            <p className="">Sub Total</p>
                            <p>{`$${subTotal}`}</p>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                            <p>Tax {`(${taxPercentage}%)`}</p>
                            <p>{`$${subTax}`}</p>
                        </div>
                    </div>
                    <div className="border-t border-neutral-600 flex flex-col gap-4 pt-2 mt-auto">
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total Price</p>
                            <p className="text-lg font-bold">{`$${total}`}</p>
                        </div>
                        <Button>Checkout</Button>
                    </div>
                </div>
            </div>
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove item?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will remove the item from your cart.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={() => {
                                if (pendingRemoveId !== null) {
                                    remove(pendingRemoveId);
                                }
                                setConfirmOpen(false);
                                setPendingRemoveId(null);
                            }}
                        >
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}

export default page;

