"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { adminSchema, AdminFormValues } from "@/lib/validations/admin";
import { createAdmin, updateAdmin } from "@/app/actions/admin";

interface UserFormProps {
    initialData?: AdminFormValues & { id: string };
    isEdit?: boolean;
}

export function UserForm({ initialData, isEdit = false }: UserFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            password: "",
        },
    });

    async function onSubmit(data: AdminFormValues) {
        setIsSubmitting(true);
        setError(null);

        try {
            let result;
            if (isEdit && initialData) {
                result = await updateAdmin(initialData.id, data);
            } else {
                result = await createAdmin(data);
            }

            if (result.error) {
                setError(result.error);
                return;
            }

            router.push("/admin/users");
            router.refresh();
        } catch (e) {
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/users"
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <h1 className="text-3xl font-bold text-slate-800">
                    {isEdit ? "Edit User" : "Create New User"}
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input
                            {...form.register("name")}
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="John Doe"
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input
                            {...form.register("email")}
                            type="email"
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="john@example.com"
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Password {isEdit && <span className="text-slate-400 font-normal">(Leave blank to keep unchanged)</span>}
                        </label>
                        <input
                            {...form.register("password")}
                            type="password"
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={isEdit ? "New password (optional)" : "Password"}
                        />
                        {form.formState.errors.password && (
                            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:opacity-50 font-medium"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save User
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
