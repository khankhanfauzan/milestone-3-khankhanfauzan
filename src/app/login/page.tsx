"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fetchUserProfile, loginUser } from "@/services/api";
import { storage } from "@/services/storage";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";

function page() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Login failed");
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const result = await loginUser(data);
            console.log("login result", result);
            storage.setToken(result.access_token);

            const user = await fetchUserProfile();

            storage.setUser({
                name: user.name,
                email: user.email,
                avatarUrl: user.avatar,
                role: user.role,
            });

            router.push("/");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Login failed");
            setErrorOpen(true);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 justify-center flex flex-col items-center">
            <div className="flex flex-col p-4 border rounded-lg shadow-2xl bg-neutral-900 w-full max-w-md">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white">
                        Welcome Back
                    </h3>
                    <p className="text-neutral-400 text-sm">
                        Please enter your email & password to sign in.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-email">
                                Email
                            </FieldLabel>
                            <Input
                                id="fieldgroup-email"
                                type="email"
                                placeholder="name@example.com"
                                className={
                                    errors.password ? "border-red-500" : ""
                                }
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.email.message as string}
                                </span>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-password">
                                Password
                            </FieldLabel>
                            <Input
                                id="fieldgroup-password"
                                type="password"
                                placeholder="******"
                                className={
                                    errors.password ? "border-red-500" : ""
                                }
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Minimum 4 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.password.message as string}
                                </span>
                            )}
                        </Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Login"}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
            <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login failed</AlertDialogTitle>
                        <AlertDialogDescription>
                            {errorMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setErrorOpen(false)}>
                            Close
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => setErrorOpen(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default page;
