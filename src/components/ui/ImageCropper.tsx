"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { ModernButton } from "@/components/ui/FormElements";
import { Upload, X, Check, ZoomIn, ZoomOut } from "lucide-react";
import getCroppedImg from "@/lib/canvasUtils";
import { uploadImageAction } from "@/app/actions/upload";

// ... imports

interface ImageCropperProps {
    onImageCropped: (url: string) => void;
    aspect?: number;
    value?: string; // Changed from initialImage
    label?: string;
    circularCrop?: boolean;
}

export function ImageCropper({ onImageCropped, aspect = 16 / 9, value, label = "Upload Image", circularCrop = false }: ImageCropperProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl as string);
        }
    };

    const handleCreateCroppedImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        setUploading(true);
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (!croppedImageBlob) throw new Error("Could not crop image");

            const file = new File([croppedImageBlob], "cropped-image.jpg", { type: "image/jpeg" });
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadImageAction(formData);

            if (res.error) {
                alert(res.error);
            } else if (res.url) {
                onImageCropped(res.url); // Updates parent form value
                setImageSrc(null); // Close cropper
            }
        } catch (e) {
            console.error(e);
            alert("Failed to crop/upload image");
        } finally {
            setUploading(false);
        }
    };

    const readFile = (file: File) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    // 1. Active Cropping Mode
    if (imageSrc) {
        return (
            <div className="w-full space-y-4">
                <div className="relative w-full h-80 bg-slate-900 rounded-xl overflow-hidden shadow-md">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape={circularCrop ? 'round' : 'rect'}
                        showGrid={!circularCrop}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <ZoomOut className="w-4 h-4 text-slate-500" />
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <ZoomIn className="w-4 h-4 text-slate-500" />
                </div>

                <div className="flex justify-end gap-2">
                    <ModernButton variant="secondary" onClick={() => setImageSrc(null)} disabled={uploading}>
                        <X className="w-4 h-4 mr-2" /> Cancel
                    </ModernButton>
                    <ModernButton onClick={handleCreateCroppedImage} disabled={uploading} isLoading={uploading}>
                        <Check className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Crop & Save"}
                    </ModernButton>
                </div>
            </div>
        );
    }

    // 2. Preview Mode (Value exists)
    if (value) {
        return (
            <div className="w-full relative group">
                <div className={`relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50 ${circularCrop ? 'aspect-square rounded-full' : 'aspect-video'}`}>
                    {/* Aspect ratio handling might need inline style if aspect variable varies a lot */}
                    <img
                        src={value}
                        alt="Preview"
                        className={`w-full h-full object-cover ${circularCrop ? 'rounded-full' : ''}`}
                        style={{ aspectRatio: circularCrop ? '1/1' : aspect }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <label className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 px-4 py-2 rounded-lg font-medium shadow-lg cursor-pointer flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 duration-200">
                            <Upload className="w-4 h-4" /> Change Image
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    </div>
                </div>
                {/* Fallback label if needed */}
            </div>
        );
    }

    // 3. Upload Mode (Empty)
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">{label}</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF</p>
            </div>
        </div>
    );
}
