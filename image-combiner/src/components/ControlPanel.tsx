'use client';

import { useState } from 'react';
import { 
  Trash2, Copy, RotateCw, FlipHorizontal, FlipVertical, 
  Eye, EyeOff, Settings, Palette, Square, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import { ImageItem, CanvasSettings } from '@/app/page';

interface ControlPanelProps {
  images: ImageItem[];
  selectedImage: ImageItem | undefined;
  canvasSettings: CanvasSettings;
  onImageUpdate: (id: string, updates: Partial<ImageItem>) => void;
  onImageDelete: (id: string) => void;
  onImageDuplicate: (id: string) => void;
  onImageSelect: (id: string | null) => void;
  onCanvasSettingsUpdate: (settings: CanvasSettings) => void;
  onClearCanvas: () => void;
}

export default function ControlPanel({
  images,
  selectedImage,
  canvasSettings,
  onImageUpdate,
  onImageDelete,
  onImageDuplicate,
  onImageSelect,
  onCanvasSettingsUpdate,
  onClearCanvas,
}: ControlPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    imageList: true,
    imageProps: true,
    canvasSettings: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleImagePropertyChange = (property: keyof ImageItem, value: any) => {
    if (selectedImage) {
      onImageUpdate(selectedImage.id, { [property]: value });
    }
  };

  const handleCanvasPropertyChange = (property: keyof CanvasSettings, value: any) => {
    onCanvasSettingsUpdate({
      ...canvasSettings,
      [property]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* 图片列表 */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('imageList')}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
        >
          <h3 className="font-semibold text-gray-800">2. 图片列表 ({images.length})</h3>
          {expandedSections.imageList ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.imageList && (
          <div className="p-3 border-t space-y-2">
            {images.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                暂无图片，请先上传图片
              </p>
            ) : (
              <>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`
                      flex items-center space-x-2 p-2 rounded border cursor-pointer transition-colors
                      ${selectedImage?.id === image.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => onImageSelect(image.id)}
                  >
                    <img
                      src={image.url}
                      alt={`图片 ${index + 1}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        图片 {index + 1}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round(image.width)} × {Math.round(image.height)}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageDuplicate(image.id);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="复制"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageDelete(image.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {images.length > 0 && (
                  <button
                    onClick={onClearCanvas}
                    className="w-full mt-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                  >
                    清空所有图片
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 图片属性调整 */}
      {selectedImage && (
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('imageProps')}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
          >
            <h3 className="font-semibold text-gray-800">3. 图片属性</h3>
            {expandedSections.imageProps ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections.imageProps && (
            <div className="p-3 border-t space-y-4">
              {/* 位置调整 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">位置</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">X</label>
                    <input
                      type="number"
                      value={Math.round(selectedImage.x)}
                      onChange={(e) => handleImagePropertyChange('x', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Y</label>
                    <input
                      type="number"
                      value={Math.round(selectedImage.y)}
                      onChange={(e) => handleImagePropertyChange('y', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              </div>

              {/* 尺寸调整 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">尺寸</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">宽度</label>
                    <input
                      type="number"
                      value={Math.round(selectedImage.width)}
                      onChange={(e) => handleImagePropertyChange('width', parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">高度</label>
                    <input
                      type="number"
                      value={Math.round(selectedImage.height)}
                      onChange={(e) => handleImagePropertyChange('height', parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* 旋转 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">旋转角度</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedImage.rotation}
                    onChange={(e) => handleImagePropertyChange('rotation', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {Math.round(selectedImage.rotation)}°
                  </span>
                </div>
              </div>

              {/* 透明度 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">透明度</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedImage.opacity}
                    onChange={(e) => handleImagePropertyChange('opacity', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {Math.round(selectedImage.opacity * 100)}%
                  </span>
                </div>
              </div>

              {/* 变换操作 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">变换</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleImagePropertyChange('rotation', selectedImage.rotation + 90)}
                    className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 text-sm border rounded hover:bg-gray-50"
                  >
                    <RotateCw size={14} />
                    <span>旋转</span>
                  </button>
                  <button
                    onClick={() => handleImagePropertyChange('flipX', !selectedImage.flipX)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1 text-sm border rounded hover:bg-gray-50 ${
                      selectedImage.flipX ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                  >
                    <FlipHorizontal size={14} />
                    <span>水平</span>
                  </button>
                  <button
                    onClick={() => handleImagePropertyChange('flipY', !selectedImage.flipY)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1 text-sm border rounded hover:bg-gray-50 ${
                      selectedImage.flipY ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                  >
                    <FlipVertical size={14} />
                    <span>垂直</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 画布设置 */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('canvasSettings')}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
        >
          <h3 className="font-semibold text-gray-800">4. 画布设置</h3>
          {expandedSections.canvasSettings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.canvasSettings && (
          <div className="p-3 border-t space-y-4">
            {/* 画布尺寸 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">画布尺寸</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">宽度</label>
                  <input
                    type="number"
                    value={canvasSettings.width}
                    onChange={(e) => handleCanvasPropertyChange('width', parseInt(e.target.value) || 100)}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="100"
                    max="2000"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">高度</label>
                  <input
                    type="number"
                    value={canvasSettings.height}
                    onChange={(e) => handleCanvasPropertyChange('height', parseInt(e.target.value) || 100)}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="100"
                    max="2000"
                  />
                </div>
              </div>
            </div>

            {/* 背景颜色 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">背景颜色</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={canvasSettings.backgroundColor}
                  onChange={(e) => handleCanvasPropertyChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={canvasSettings.backgroundColor}
                  onChange={(e) => handleCanvasPropertyChange('backgroundColor', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border rounded"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* 边框设置 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">边框</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">宽度 (px)</label>
                  <input
                    type="number"
                    value={canvasSettings.borderWidth}
                    onChange={(e) => handleCanvasPropertyChange('borderWidth', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border rounded"
                    min="0"
                    max="20"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">颜色</label>
                  <input
                    type="color"
                    value={canvasSettings.borderColor}
                    onChange={(e) => handleCanvasPropertyChange('borderColor', e.target.value)}
                    className="w-full h-8 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 导出质量 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">导出质量</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={canvasSettings.quality}
                  onChange={(e) => handleCanvasPropertyChange('quality', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12 text-right">
                  {Math.round(canvasSettings.quality * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 