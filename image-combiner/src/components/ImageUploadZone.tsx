'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadZoneProps {
  onFilesUploaded: (files: File[]) => void;
  isLoading: boolean;
}

export default function ImageUploadZone({ onFilesUploaded, isLoading }: ImageUploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      onFilesUploaded(imageFiles);
    }
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: true
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">1. 选择图片</h3>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isLoading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-3">
          {isLoading ? (
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
              <Upload className="w-8 h-8 text-gray-600" />
            </div>
          )}
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {isLoading ? '正在处理图片...' : '拖拽图片到此处或点击选择'}
            </p>
            <p className="text-xs text-gray-500">
              支持 JPG, PNG, GIF, WebP 格式
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <ImageIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">提示：</p>
            <ul className="space-y-1">
              <li>• 可同时上传多张图片</li>
              <li>• 支持拖拽排序和调整大小</li>
              <li>• 所有处理都在本地完成，保护隐私</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 