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
      <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">
        Avatar
      </label>
      {avatarUrl ? (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 border border-surface-200">
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-200"
          />
          <div className="flex-1 text-sm text-surface-600 truncate">Avatar uploaded</div>
          <button
            onClick={onClear}
            aria-label="Remove avatar"
            className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          role="button"
          aria-label="Upload avatar image"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-primary-400 bg-primary-50"
              : "border-surface-200 hover:border-surface-300 hover:bg-surface-50"
          }`}
        >
          <svg className="w-8 h-8 mx-auto mb-2 text-surface-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" />
          </svg>
          <p className="text-sm text-surface-500">
            Drop image or click to upload
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            aria-label="Choose avatar file"
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
