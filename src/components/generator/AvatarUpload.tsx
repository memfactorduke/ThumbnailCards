import { useCallback, useRef, useState } from "react";

interface AvatarUploadProps {
  avatarUrl: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}

export function AvatarUpload({ avatarUrl, onUpload, onClear }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Avatar</label>
      {avatarUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="w-12 h-12 rounded-full object-cover"
          />
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <p className="text-sm text-gray-500">
            Drop image or click to upload
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
