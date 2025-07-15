'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

type LayoutType = 'horizontal' | 'vertical' | 'grid';


export default function Home() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [layoutType, setLayoutType] = useState<LayoutType>('horizontal');
  const [padding, setPadding] = useState([0]);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [borderWidth, setBorderWidth] = useState([0]);
  const [borderColor, setBorderColor] = useState('#FFFFFF');

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const newImages: UploadedImage[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    handleFiles(files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, [handleFiles]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const sortImages = useCallback((type: 'asc' | 'desc' | 'reverse' | 'shuffle') => {
    setImages(prev => {
      const newImages = [...prev];
      switch (type) {
        case 'asc':
          return newImages.sort((a, b) => a.name.localeCompare(b.name));
        case 'desc':
          return newImages.sort((a, b) => b.name.localeCompare(a.name));
        case 'reverse':
          return newImages.reverse();
        case 'shuffle':
          for (let i = newImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newImages[i], newImages[j]] = [newImages[j], newImages[i]];
          }
          return newImages;
        default:
          return newImages;
      }
    });
  }, []);

  const reset = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);
    setPadding([0]);
    setBackgroundColor('#FFFFFF');
    setBorderWidth([0]);
    setBorderColor('#000000');

    setLayoutType('horizontal');
  }, [images]);

  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'combined-image.png';
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  // Generate combined image on canvas
  useEffect(() => {
    if (images.length < 2) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    Promise.all(images.map(img => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new window.Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error(`Failed to load image: ${img.url}`));
          image.src = img.url;
        });
      })).then(loadedImages => {
        // 计算最大图片尺寸，用于百分比模式
        const maxImageWidth = Math.max(...loadedImages.map(img => img.width));
        const maxImageHeight = Math.max(...loadedImages.map(img => img.height));
        const maxDimension = Math.max(maxImageWidth, maxImageHeight);
        // 将0-100的滑块值映射到0到maxDimension/2的范围，实现平滑过渡
        const paddingValue = (padding[0] / 100) * (maxDimension / 2);
        const borderWidthValue = (borderWidth[0] / 100) * (maxDimension / 2);

        // Calculate image dimensions first
        // 删除未使用的totalWidth和totalHeight变量
        let canvasWidth = 0;
        let canvasHeight = 0;

        // Calculate canvas dimensions based on layout

      switch (layoutType) {
        case 'horizontal':
          // 计算缩放比例，使所有图片高度一致（以最高图片为准）
          const scaleFactorsH = loadedImages.map(img => maxImageHeight / img.height);
          const scaledWidthsH = loadedImages.map((img, i) => img.width * scaleFactorsH[i]);
          const totalScaledWidthH = scaledWidthsH.reduce((sum, width) => sum + width, 0);
          canvasWidth = totalScaledWidthH + (paddingValue * (images.length - 1)) + (borderWidthValue * 2);
          canvasHeight = maxImageHeight + (borderWidthValue * 2);
          break;
        case 'vertical':
          // 计算缩放比例，使所有图片宽度一致（以最宽图片为准）
          const scaleFactorsV = loadedImages.map(img => maxImageWidth / img.width);
          const scaledHeightsV = loadedImages.map((img, i) => img.height * scaleFactorsV[i]);
          const totalScaledHeightV = scaledHeightsV.reduce((sum, height) => sum + height, 0);
          canvasWidth = maxImageWidth + (borderWidthValue * 2);
          canvasHeight = totalScaledHeightV + (paddingValue * (images.length - 1)) + (borderWidthValue * 2);
          break;
        case 'grid':
          const cols = Math.ceil(Math.sqrt(images.length));
          const rows = Math.ceil(images.length / cols);
          // 计算统一的单元格大小，取最大宽高的最大值
          const cellSize = Math.max(maxImageWidth, maxImageHeight);
          canvasWidth = (cellSize * cols) + (paddingValue * (cols - 1)) + (borderWidthValue * 2);
          canvasHeight = (cellSize * rows) + (paddingValue * (rows - 1)) + (borderWidthValue * 2);
          break;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw border
      if (borderWidthValue > 0) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidthValue;
        ctx.setLineDash([]);
        ctx.strokeRect(borderWidthValue / 2, borderWidthValue / 2, canvasWidth - borderWidthValue, canvasHeight - borderWidthValue);
      }

      // Draw images
      let currentX = borderWidthValue;
      let currentY = borderWidthValue;

      loadedImages.forEach((img, index) => {
        if (layoutType === 'horizontal') {
          const scaleH = maxImageHeight / img.height;
          const scaledWidth = img.width * scaleH;
          ctx.drawImage(img, currentX, currentY, scaledWidth, maxImageHeight);
          currentX += scaledWidth + paddingValue;
        } else if (layoutType === 'vertical') {
          const scaleV = maxImageWidth / img.width;
          const scaledHeight = img.height * scaleV;
          ctx.drawImage(img, currentX, currentY, maxImageWidth, scaledHeight);
          currentY += scaledHeight + paddingValue;
        } else if (layoutType === 'grid') {
              const cols = Math.ceil(Math.sqrt(images.length));
              const col = index % cols;
              const row = Math.floor(index / cols);
              const cellSize = Math.max(maxImageWidth, maxImageHeight);
              // 计算缩放比例，使图片适应单元格
              const scale = Math.min(cellSize / img.width, cellSize / img.height);
              const scaledWidth = img.width * scale;
              const scaledHeight = img.height * scale;
              // 计算居中位置
              const x = currentX + (col * (cellSize + paddingValue)) + (cellSize - scaledWidth) / 2;
              const y = currentY + (row * (cellSize + paddingValue)) + (cellSize - scaledHeight) / 2;
              ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        }
      });
    });
  }, [images, layoutType, padding, backgroundColor, borderWidth, borderColor]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Image src="/icons/logo.svg" alt="Logo" width={24} height={24} className="w-6 h-6" />
            Combine Images - Create & Merge Photos Online
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Upload Area */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">1. Select Images to Combine</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <Image src="/icons/upload-icon.svg" alt="Upload" width={32} height={32} className="w-8 h-8 mx-auto opacity-50" />
              <div className="text-gray-600">Drag & drop your photos here</div>
              <div className="text-gray-500">or</div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Choose Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          {/* Image Thumbnails */}
          {images.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">2. Arrange Your Images</h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sortImages('asc')}
                  className="flex items-center gap-1"
                >
                  <Image src="/icons/sort-asc.svg" alt="Sort ascending" width={14} height={14} className="w-3.5 h-3.5" />
                  Sort Ascending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sortImages('desc')}
                  className="flex items-center gap-1"
                >
                  <Image src="/icons/sort-desc.svg" alt="Sort descending" width={14} height={14} className="w-3.5 h-3.5" />
                  Sort Descending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sortImages('reverse')}
                  className="flex items-center gap-1"
                >
                  <Image src="/icons/reverse.svg" alt="Reverse order" width={14} height={14} className="w-3.5 h-3.5" />
                  Reverse Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sortImages('shuffle')}
                  className="flex items-center gap-1"
                >
                  <Image src="/icons/shuffle.svg" alt="Shuffle" width={14} height={14} className="w-3.5 h-3.5" />
                  Shuffle
                </Button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <Image
                      src={image.url}
                      alt={image.name}
                      width={300}
                      height={128}
                      className="w-full h-16 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Section 3: Layout Options */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">3. Choose Layout Style</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setLayoutType('horizontal')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                layoutType === 'horizontal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="w-12 h-8 mx-auto mb-2 bg-gray-400 rounded flex">
                <div className="flex-1 bg-gray-600 rounded-l"></div>
                <div className="w-px bg-white"></div>
                <div className="flex-1 bg-gray-600 rounded-r"></div>
              </div>
              <div className="text-sm">Horizontal</div>
            </button>

            <button
              onClick={() => setLayoutType('vertical')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                layoutType === 'vertical' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="w-8 h-12 mx-auto mb-2 bg-gray-400 rounded flex flex-col">
                <div className="flex-1 bg-gray-600 rounded-t"></div>
                <div className="h-px bg-white"></div>
                <div className="flex-1 bg-gray-600 rounded-b"></div>
              </div>
              <div className="text-sm">Vertical</div>
            </button>

            <button
              onClick={() => setLayoutType('grid')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                layoutType === 'grid' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-400 rounded grid grid-cols-2 gap-px">
                <div className="bg-gray-600 rounded-tl"></div>
                <div className="bg-gray-600 rounded-tr"></div>
                <div className="bg-gray-600 rounded-bl"></div>
                <div className="bg-gray-600 rounded-br"></div>
              </div>
              <div className="text-sm">Grid</div>
            </button>
          </div>

          <h3 className="text-lg font-medium mb-4">Customize Appearance</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Padding */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Padding</label>
                <span className="text-sm text-gray-500">{padding[0]}</span>
              </div>
              <Slider
                  value={padding}
                  onValueChange={setPadding}
                  max={100}
                  step={1}
                  className="w-full"
                />
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
                <span className="text-sm text-gray-600">{backgroundColor}</span>
              </div>
            </div>

            {/* Border Width */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Border Width</label>
                <span className="text-sm text-gray-500">{borderWidth[0]}</span>
              </div>
              <Slider
                  value={borderWidth}
                  onValueChange={setBorderWidth}
                  max={100}
                  step={1}
                  className="w-full"
                />
            </div>

            {/* Border Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Border</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
                <span className="text-sm text-gray-600">{borderColor}</span>
              </div>
            </div>


          </div>
        </Card>

        {/* Section 4: Preview */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">4. Preview Combined Image</h2>
          <div className="bg-gray-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
            {images.length < 2 ? (
              <div className="text-center text-gray-500">
                <Image src="/icons/no-preview.svg" alt="" width={40} height={40} className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <div className="font-medium">No Preview Available</div>
                <div className="text-sm">Select at least 2 images to combine</div>
              </div>
            ) : (
              <canvas ref={canvasRef} className="max-w-full h-auto border rounded" />
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={reset} disabled={images.length === 0}>
            Reset
          </Button>
          <Button onClick={downloadImage} disabled={images.length < 2} className="bg-blue-600 hover:bg-blue-700">
            Download
          </Button>
        </div>

        {/* Info Section */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Combine Images: The Best Way to Merge Photos Online</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our free Combine Images tool helps you easily merge multiple photos into one stunning layout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-medium mb-2">Intuitive Design</h3>
              <p className="text-sm text-gray-600">Clean, user-friendly interface makes combining images quick and easy for everyone.</p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-2">🖼️</div>
              <h3 className="font-medium mb-2">Multiple Layouts</h3>
              <p className="text-sm text-gray-600">Choose from horizontal, vertical, or grid arrangements when combining your images.</p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-medium mb-2">Customizable Styles</h3>
              <p className="text-sm text-gray-600">Add padding between images, colorful borders, and custom background colors to create unique designs.</p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-medium mb-2">Drag & Reorder</h3>
              <p className="text-sm text-gray-600">Easily arrange photos in the image combiner by dragging thumbnails or using sort buttons.</p>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-2">💾</div>
              <h3 className="font-medium mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600">Download your combined image as a high-quality PNG with one click.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Frequently Asked Questions About Our Combine Images</h2>

            <div className="space-y-3">
              <details className="group">
                <summary className="font-medium cursor-pointer">How many images can I combine at once?</summary>
                <p className="text-gray-600 mt-2 text-sm">Our image combiner tool lets you merge as many images as you like. The tool automatically adjusts layouts to accommodate multiple photos.</p>
              </details>

              <details className="group">
                <summary className="font-medium cursor-pointer">Can I customize the padding between images?</summary>
                <p className="text-gray-600 mt-2 text-sm">Yes! Our image combiner now features adjustable padding controls. You can set padding from 0 to 50 pixels to get the perfect spacing between your photos.</p>
              </details>

              <details className="group">
                <summary className="font-medium cursor-pointer">Can I add borders to the images?</summary>
                <p className="text-gray-600 mt-2 text-sm">Absolutely. You can add borders with customizable width, color, and style (solid, dashed, or dotted) to create professional-looking photo collages.</p>
              </details>

              <details className="group">
                <summary className="font-medium cursor-pointer">Are my images stored on your servers when I use the image combiner?</summary>
                <p className="text-gray-600 mt-2 text-sm">No. Our image combiner processes everything locally in your browser. Your images are never uploaded to any server, ensuring complete privacy.</p>
              </details>

              <details className="group">
                <summary className="font-medium cursor-pointer">What image formats can the image combiner work with?</summary>
                <p className="text-gray-600 mt-2 text-sm">The image combiner supports all common image formats including JPG, PNG, GIF, and WebP.</p>
              </details>
            </div>
          </div>
        </Card>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Combine Images - Free Online Tool to Merge Photos</p>
          <p>A simple, privacy-focused tool to combine multiple images into one</p>
          <p>© 2025 Combine Images Tool</p>
        </div>
      </footer>
    </div>
  );
}
