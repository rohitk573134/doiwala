/// <reference types="vite/client" />
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
  className?: string;
}

export default function ImageUpload({ value, onChange, multiple = false, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'docs_upload_example_us_preset';

    try {
      const uploadPromises = Array.from(files).map(async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File "${file.name}" is not an image`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File "${file.name}" is too large (max 5MB)`);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        setUploadProgress(prev => prev + (100 / files.length));
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : (value ? [value] : []);
        onChange([...currentValues, ...urls]);
      } else {
        onChange(urls[0]);
      }
    } catch (err: any) {
      console.error('Upload Error:', err);
      setError(err.message || 'Failed to upload image(s). Check Cloudinary settings.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isSingleValue = typeof value === 'string' && value !== '';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {isSingleValue && !multiple ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
          <img src={value as string} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110"
              title="Change Image"
            >
              <Upload size={18} />
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all transform hover:scale-110"
              title="Remove Image"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-orange-50 hover:border-[#ff9933]'
          } ${isUploading ? 'cursor-not-allowed opacity-80' : ''}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-[#ff9933]">
              <Loader2 size={40} className="animate-spin mb-3" />
              <span className="text-sm font-semibold">Uploading... {Math.round(uploadProgress)}%</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500 p-6 text-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Upload size={32} className="text-[#ff9933]" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                {multiple ? 'Click to upload multiple images' : 'Click to upload image'}
              </span>
              <span className="text-xs mt-2 text-gray-400">JPG, PNG, WEBP up to 5MB each</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs mt-1 bg-red-50 p-2 rounded border border-red-100">
          <X size={14} />
          <span>{error}</span>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        multiple={multiple}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}
