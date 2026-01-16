import { getContactSubmissions } from "@/app/actions/contact";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

interface ContactsPageProps {
    searchParams: { page?: string };
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
    const page = parseInt(searchParams.page || "1", 10);
    const result = await getContactSubmissions(page, 20);

    if ("error" in result) {
        return (
            <div className="p-6">
                <p className="text-red-500">Error: {result.error}</p>
            </div>
        );
    }

    const { submissions, total, pages, currentPage } = result;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "NEW":
                return "bg-blue-100 text-blue-800";
            case "READ":
                return "bg-green-100 text-green-800";
            case "ARCHIVED":
                return "bg-slate-100 text-slate-800";
            default:
                return "bg-slate-100 text-slate-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Contact Submissions</h1>
                    <p className="text-slate-500 mt-1">Manage customer inquiries from the contact form</p>
                </div>
                <div className="text-sm text-slate-600">
                    Total: <span className="font-semibold">{total}</span> submissions
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <p className="text-slate-500 text-lg">No contact submissions yet</p>
                    <p className="text-slate-400 text-sm mt-2">Submissions will appear here when customers fill out the contact form</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Message Preview
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Received
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {submissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">{submission.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-600">{submission.email}</div>
                                        {submission.phone && (
                                            <div className="text-xs text-slate-400">{submission.phone}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600 max-w-md truncate">
                                            {submission.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(submission.status)}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link
                                            href={`/admin/contacts/${submission.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    {currentPage > 1 && (
                        <Link
                            href={`/admin/contacts?page=${currentPage - 1}`}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Previous
                        </Link>
                    )}
                    <span className="px-4 py-2 text-slate-600">
                        Page {currentPage} of {pages}
                    </span>
                    {currentPage < pages && (
                        <Link
                            href={`/admin/contacts?page=${currentPage + 1}`}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
