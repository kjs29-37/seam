"use client";

import { useState } from "react";

type MockFile = { id: string; name: string; emoji: string };

const sampleImages: MockFile[] = [
  { id: "1", name: "reference-suit.jpg", emoji: "🤵" },
  { id: "2", name: "fabric-inspiration.png", emoji: "🧵" },
];

type Props = {
  notes: string;
  onNotesChange: (v: string) => void;
};

export default function Step2Inspiration({ notes, onNotesChange }: Props) {
  const [files, setFiles] = useState<MockFile[]>([]);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
  }

  function addSample() {
    const sample = sampleImages[files.length % sampleImages.length];
    setFiles((prev) => [...prev, { ...sample, id: Date.now().toString() }]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const labelClass = "block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2";
  const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[1.5rem] font-bold text-[#0f0e0b] mb-1">Inspiration Images</h2>
        <p className="text-[0.86rem] text-[#6b6757]">
          Upload photos, screenshots, sketches, or reference outfits. The more visual context you provide, the better.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-[6px] p-10 text-center transition-colors ${
          dragging ? "border-[#8b6914] bg-[#faf4e1]" : "border-[#d0ccbf] bg-[#f7f5f0] hover:border-[#8b6914] hover:bg-[#faf4e1]"
        }`}
      >
        <div className="text-3xl mb-3">📎</div>
        <p className="text-[0.86rem] font-medium text-[#1c1b17] mb-1">
          Drag and drop images here
        </p>
        <p className="text-[0.75rem] text-[#9c9886] mb-4">JPG, PNG or WebP · Max 10MB per file</p>
        <button
          type="button"
          onClick={addSample}
          className="bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:opacity-80 transition-opacity"
        >
          Browse Files
        </button>
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div>
          <label className={labelClass}>Uploaded Images ({files.length})</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {files.map((file) => (
              <div key={file.id} className="relative border border-[#e6e3da] rounded-[6px] overflow-hidden bg-[#f7f5f0]">
                <div className="aspect-square flex items-center justify-center text-4xl">
                  {file.emoji}
                </div>
                <div className="p-2 border-t border-[#e6e3da]">
                  <p className="text-[0.65rem] text-[#6b6757] truncate">{file.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="absolute top-1.5 right-1.5 h-5 w-5 bg-[#0f0e0b] text-white text-[0.6rem] rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caption / notes */}
      <div>
        <label className={labelClass}>Notes on your inspiration (optional)</label>
        <textarea
          rows={3}
          placeholder="e.g. I love the collar shape in image 1 but want the fabric from image 2. I prefer the lapel style to be narrower..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="bg-[#f7f5f0] border border-[#e6e3da] rounded-[6px] p-4 text-[0.78rem] text-[#6b6757] leading-[1.6]">
        <strong className="text-[#1c1b17]">Tip:</strong> Include photos from multiple angles, close-ups of fabric textures, and anything that captures the look and feel you&apos;re after. The tailor will refer to these throughout production.
      </div>
    </div>
  );
}
