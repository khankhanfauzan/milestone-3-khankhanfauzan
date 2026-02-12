"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth";
import type { LoginFormState } from "@/lib/definitions";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, action, pending] = useActionState<LoginFormState, FormData>(
        login,
        undefined,
    );

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

                <form action={action}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                title="Please enter a valid email address."
                                className={
                                    state?.errors?.email ? "border-red-500" : ""
                                }
                                required
                            />
                            {state?.errors?.email && (
                                <span className="text-red-500 text-xs mt-1">
                                    {state.errors.email}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="******"
                                    className={
                                        state?.errors?.password
                                            ? "border-red-500 pr-12"
                                            : "pr-12"
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 text-xs text-neutral-400 hover:text-neutral-200"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {state?.errors?.password && (
                                <span className="text-red-500 text-xs mt-1">
                                    {state.errors.password}
                                </span>
                            )}
                        </Field>

                        {state?.message && (
                            <p className="text-red-500 text-sm">
                                {state.message}
                            </p>
                        )}

                        <Button type="submit" disabled={pending}>
                            {pending ? "Signing in..." : "Login"}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
