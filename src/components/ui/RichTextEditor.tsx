"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Heading1, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[150px] p-4 text-slate-900',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false // Fix for hydration mismatch in Next.js
    });

    if (!editor) {
        return null;
    }

    // Determine active states for styling
    const isActive = (type: string | Record<string, any>, options?: any) => editor.isActive(type as any, options);

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1 flex-wrap">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-slate-300 mx-1 self-center" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('heading', { level: 1 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('heading', { level: 2 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('heading', { level: 3 }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-slate-300 mx-1 self-center" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive({ textAlign: 'right' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive({ textAlign: 'justify' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                    title="Justify"
                >
                    <AlignJustify className="w-4 h-4" />
                </button>
            </div>
            <EditorContent editor={editor} className="min-h-[150px]" />
        </div >
    );
}
