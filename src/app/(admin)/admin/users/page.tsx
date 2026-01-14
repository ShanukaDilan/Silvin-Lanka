import { getAdmins, deleteAdmin } from "@/app/actions/admin";
import Link from "next/link";
import { Plus, Pencil, Trash2, UserCog, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const users = await getAdmins();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Users</h1>
                <Link
                    href="/admin/users/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create New User
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Name</th>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Email</th>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Created At</th>
                            <th className="text-right py-4 px-6 font-medium text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6 font-medium text-slate-900 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                    {user.name || "N/A"}
                                </td>
                                <td className="py-4 px-6 text-slate-600">{user.email}</td>
                                <td className="py-4 px-6 text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-6 text-right space-x-2">
                                    <Link
                                        href={`/admin/users/${user.id}`}
                                        className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteAdmin(user.id);
                                    }} className="inline-block">
                                        <button className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-slate-500">No users found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
