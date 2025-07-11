'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCw, FlipHorizontal, FlipVertical, Grid, Layers, Settings } from 'lucide-react';
import ImageUploadZone from '@/components/ImageUploadZone';
import ImageCanvas from '@/components/ImageCanvas';
import ControlPanel from '@/components/ControlPanel';
import Header from '@/components/Header';
import FeatureSection from '@/components/FeatureSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export interface ImageItem {
  id: string;
  file: File;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  opacity: number;
  zIndex: number;
}

export interface CanvasSettings {
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  quality: number;
}

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [canvasSettings, setCanvasSettings] = useState<CanvasSettings>({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    quality: 0.8,
  });
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<any>(null);

  const handleFilesUploaded = useCallback((files: File[]) => {
    setIsLoading(true);
    
    files.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = 200;
        const maxHeight = 200;
        
        let width = maxWidth;
        let height = maxWidth / aspectRatio;
        
        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
        
        const newImage: ImageItem = {
          id: Date.now().toString() + index,
          file,
          url,
          x: 50 + index * 20,
          y: 50 + index * 20,
          width,
          height,
          rotation: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          zIndex: index,
        };
        
        setImages(prev => [...prev, newImage]);
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    });
    
    setIsLoading(false);
  }, []);

  const updateImage = useCallback((id: string, updates: Partial<ImageItem>) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, ...updates } : img
    ));
  }, []);

  const deleteImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
  }, [selectedImageId]);

  const duplicateImage = useCallback((id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      const newImage: ImageItem = {
        ...image,
        id: Date.now().toString(),
        x: image.x + 20,
        y: image.y + 20,
        zIndex: Math.max(...images.map(img => img.zIndex)) + 1,
      };
      setImages(prev => [...prev, newImage]);
    }
  }, [images]);

  const clearCanvas = useCallback(() => {
    setImages([]);
    setSelectedImageId(null);
  }, []);

  const downloadImage = useCallback(async () => {
    if (canvasRef.current) {
      try {
        const uri = canvasRef.current.toDataURL({
          pixelRatio: 2,
          format: 'image/png',
          quality: canvasSettings.quality,
        });
        
        const link = document.createElement('a');
        link.download = `combined-image-${Date.now()}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('下载图片失败:', error);
      }
    }
  }, [canvasSettings.quality]);

  const selectedImage = images.find(img => img.id === selectedImageId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 主要编辑区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 sticky top-8">
              <ImageUploadZone 
                onFilesUploaded={handleFilesUploaded}
                isLoading={isLoading}
              />
              
              <ControlPanel
                images={images}
                selectedImage={selectedImage}
                canvasSettings={canvasSettings}
                onImageUpdate={updateImage}
                onImageDelete={deleteImage}
                onImageDuplicate={duplicateImage}
                onImageSelect={setSelectedImageId}
                onCanvasSettingsUpdate={setCanvasSettings}
                onClearCanvas={clearCanvas}
              />
            </div>
          </div>

          {/* 主画布区域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">画布预览</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadImage}
                    disabled={images.length === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download size={20} />
                    <span>下载图片</span>
                  </button>
                </div>
              </div>
              
              {images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center min-h-96">
                  <div className="text-center text-gray-500">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4">
                      <Layers className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium mb-2">画布为空</p>
                    <p className="text-sm">请先上传图片开始拼接</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <ImageCanvas
                    ref={canvasRef}
                    images={images}
                    canvasSettings={canvasSettings}
                    selectedImageId={selectedImageId}
                    onImageUpdate={updateImage}
                    onImageSelect={setSelectedImageId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 功能特性介绍 */}
      <FeatureSection />

      {/* FAQ 常见问题 */}
      <FAQSection />

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
