"use client";

import { useState } from "react";
import { updateContactSubmissionStatus, deleteContactSubmission } from "@/app/actions/contact";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ContactSubmissionActionsProps {
    id: string;
    currentStatus: "NEW" | "READ" | "ARCHIVED";
}

export function ContactSubmissionActions({ id, currentStatus }: ContactSubmissionActionsProps) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStatusChange = async (status: "NEW" | "READ" | "ARCHIVED") => {
        setIsUpdating(true);
        const result = await updateContactSubmissionStatus(id, status);

        if ("error" in result) {
            alert("Error: " + result.error);
        } else {
            router.refresh();
        }
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this submission?")) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteContactSubmission(id);

        if ("error" in result) {
            alert("Error: " + result.error);
            setIsDeleting(false);
        } else {
            router.push("/admin/contacts");
        }
    };

    return (
        <div className="flex items-center gap-3">
            <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value as "NEW" | "READ" | "ARCHIVED")}
                disabled={isUpdating}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            >
                <option value="NEW">NEW</option>
                <option value="READ">READ</option>
                <option value="ARCHIVED">ARCHIVED</option>
            </select>

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
}
