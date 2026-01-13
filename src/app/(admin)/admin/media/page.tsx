"use client";

import { useEffect, useState } from "react";
import { getMediaFiles, deleteMediaFile, type MediaFile } from "@/app/actions/media";
import { Trash2, AlertCircle, CheckCircle2, XCircle, Search } from "lucide-react";
import Image from "next/image";

export default function MediaManagerPage() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "active" | "unused">("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadFiles();
    }, []);

    async function loadFiles() {
        try {
            setLoading(true);
            const data = await getMediaFiles();
            setFiles(data);
        } catch (error) {
            console.error("Failed to load files", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(filename: string) {
        if (!confirm("Are you sure you want to permanently delete this file? This action cannot be undone.")) {
            return;
        }

        setDeleting(filename);
        try {
            const result = await deleteMediaFile(filename);
            if (result.success) {
                setFiles(files.filter(f => f.name !== filename));
            } else {
                alert("Failed to delete file");
            }
        } catch (err) {
            alert("Error deleting file");
        } finally {
            setDeleting(null);
        }
    }

    const filteredFiles = files.filter(file => {
        const matchesFilter =
            filter === "all" ? true :
                filter === "active" ? file.isActive :
                    !file.isActive;

        const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const formatSize = (bytes: number) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Media Manager</h1>
                    <p className="text-slate-400 mt-1">Manage your uploaded files and clean up unused assets.</p>
                </div>

                <div className="flex gap-2">
                    <div className="bg-slate-800 p-1 rounded-lg flex text-sm">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-3 py-1.5 rounded-md transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`px-3 py-1.5 rounded-md transition-colors ${filter === "active" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("unused")}
                            className={`px-3 py-1.5 rounded-md transition-colors ${filter === "unused" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            Unused
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search files..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Total Files</div>
                    <div className="text-2xl font-bold text-white">{files.length}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-emerald-400 text-sm mb-1">Active Files</div>
                    <div className="text-2xl font-bold text-white">{files.filter(f => f.isActive).length}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Unused Files</div>
                    <div className="text-2xl font-bold text-white">{files.filter(f => !f.isActive).length}</div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading media files...</div>
            ) : filteredFiles.length === 0 ? (
                <div className="text-center py-20 text-slate-400 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="w-12 h-12 text-slate-600" />
                    </div>
                    <p className="text-lg font-medium text-white">No files found</p>
                    <p className="text-sm">Try adjusting your filters or upload some images.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredFiles.map((file) => (
                        <div
                            key={file.name}
                            className={`group relative bg-slate-800 rounded-xl overflow-hidden border transition-all hover:shadow-xl ${file.isActive ? "border-emerald-500/30 hover:border-emerald-500/50" : "border-slate-700 hover:border-slate-600"
                                }`}
                        >
                            <div className="aspect-square relative bg-slate-900">
                                <Image
                                    src={file.url}
                                    alt={file.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        disabled={deleting === file.name || file.isActive}
                                        className={`p-2 rounded-full transition-transform hover:scale-110 ${file.isActive
                                                ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                                                : "bg-red-500 text-white hover:bg-red-600"
                                            }`}
                                        title={file.isActive ? "Cannot delete active file" : "Delete file"}
                                    >
                                        {deleting === file.name ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Trash2 className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-2 right-2">
                                    {file.isActive ? (
                                        <div className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Active
                                        </div>
                                    ) : (
                                        <div className="bg-slate-600/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                                            Unused
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-3">
                                <p className="text-sm font-medium text-white truncate" title={file.name}>
                                    {file.name}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-slate-500">{formatSize(file.size)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
