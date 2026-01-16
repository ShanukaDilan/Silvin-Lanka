import { getContactSubmission } from "@/app/actions/contact";
import Link from "next/link";
import { format } from "date-fns";
import { ContactSubmissionActions } from "./ContactSubmissionActions";
import { ArrowLeft, Mail, Phone, User, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

interface ContactDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
    const { id } = await params;
    const result = await getContactSubmission(id);

    if ("error" in result) {
        return (
            <div className="space-y-6">
                <Link
                    href="/admin/contacts"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Contacts
                </Link>
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <p className="text-red-500">Error: {result.error}</p>
                </div>
            </div>
        );
    }

    const { submission } = result;

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
            <Link
                href="/admin/contacts"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Contacts
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Contact Submission</h1>
                    <p className="text-slate-500 mt-1">
                        Received on {format(new Date(submission.createdAt), "PPpp")}
                    </p>
                </div>
                <ContactSubmissionActions id={submission.id} currentStatus={submission.status} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                {/* Status Badge */}
                <div>
                    <span className={`px-3 py-1.5 inline-flex text-sm font-semibold rounded-full ${getStatusBadge(submission.status)}`}>
                        Status: {submission.status}
                    </span>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <User className="w-4 h-4" />
                            <span className="font-medium">Name</span>
                        </div>
                        <p className="text-lg text-slate-900">{submission.name}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Mail className="w-4 h-4" />
                            <span className="font-medium">Email</span>
                        </div>
                        <a
                            href={`mailto:${submission.email}`}
                            className="text-lg text-blue-600 hover:text-blue-800"
                        >
                            {submission.email}
                        </a>
                    </div>

                    {submission.phone && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium">Phone</span>
                            </div>
                            <a
                                href={`tel:${submission.phone}`}
                                className="text-lg text-blue-600 hover:text-blue-800"
                            >
                                {submission.phone}
                            </a>
                        </div>
                    )}
                </div>

                {/* Message */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">Message</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6">
                        <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {submission.message}
                        </p>
                    </div>
                </div>

                {/* Timestamps */}
                <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500">
                    <div>
                        <span className="font-medium">Submitted:</span>{" "}
                        {format(new Date(submission.createdAt), "PPpp")}
                    </div>
                    <div>
                        <span className="font-medium">Last Updated:</span>{" "}
                        {format(new Date(submission.updatedAt), "PPpp")}
                    </div>
                </div>
            </div>
        </div>
    );
}
