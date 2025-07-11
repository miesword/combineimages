'use client';

import { Grid, Rows, Columns, Square } from 'lucide-react';
import { ImageItem, CanvasSettings } from '@/app/page';

interface QuickLayoutsProps {
  images: ImageItem[];
  canvasSettings: CanvasSettings;
  onImagesUpdate: (images: ImageItem[]) => void;
  onCanvasUpdate: (settings: CanvasSettings) => void;
}

export default function QuickLayouts({ 
  images, 
  canvasSettings, 
  onImagesUpdate, 
  onCanvasUpdate 
}: QuickLayoutsProps) {
  
  const layouts = [
    {
      id: 'horizontal',
      name: '水平排列',
      icon: <Columns className="w-5 h-5" />,
      description: '图片水平排成一行',
    },
    {
      id: 'vertical',
      name: '垂直排列',
      icon: <Rows className="w-5 h-5" />,
      description: '图片垂直排成一列',
    },
    {
      id: 'grid-2x2',
      name: '2×2 网格',
      icon: <Grid className="w-5 h-5" />,
      description: '2行2列网格布局',
    },
    {
      id: 'grid-auto',
      name: '自动网格',
      icon: <Square className="w-5 h-5" />,
      description: '根据图片数量自动排列',
    }
  ];

  const applyLayout = (layoutId: string) => {
    if (images.length === 0) return;

    const padding = 20;
    let newImages = [...images];
    let newCanvasSettings = { ...canvasSettings };

    switch (layoutId) {
      case 'horizontal':
        // 水平排列
        let totalWidth = 0;
        const maxHeight = Math.max(...images.map(img => img.height));
        
        newImages = images.map((img, index) => {
          const x = totalWidth + (index > 0 ? padding : 0);
          totalWidth += img.width + (index > 0 ? padding : 0);
          
          return {
            ...img,
            x,
            y: (maxHeight - img.height) / 2,
            rotation: 0,
            flipX: false,
            flipY: false,
          };
        });
        
        newCanvasSettings = {
          ...canvasSettings,
          width: totalWidth + padding * 2,
          height: maxHeight + padding * 2,
        };
        break;

      case 'vertical':
        // 垂直排列
        let totalHeight = 0;
        const maxWidth = Math.max(...images.map(img => img.width));
        
        newImages = images.map((img, index) => {
          const y = totalHeight + (index > 0 ? padding : 0);
          totalHeight += img.height + (index > 0 ? padding : 0);
          
          return {
            ...img,
            x: (maxWidth - img.width) / 2,
            y,
            rotation: 0,
            flipX: false,
            flipY: false,
          };
        });
        
        newCanvasSettings = {
          ...canvasSettings,
          width: maxWidth + padding * 2,
          height: totalHeight + padding * 2,
        };
        break;

      case 'grid-2x2':
        // 2x2 网格
        const cellWidth = 200;
        const cellHeight = 200;
        
        newImages = images.slice(0, 4).map((img, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          
          return {
            ...img,
            x: col * (cellWidth + padding) + padding,
            y: row * (cellHeight + padding) + padding,
            width: Math.min(img.width, cellWidth),
            height: Math.min(img.height, cellHeight),
            rotation: 0,
            flipX: false,
            flipY: false,
          };
        });
        
        newCanvasSettings = {
          ...canvasSettings,
          width: 2 * cellWidth + 3 * padding,
          height: 2 * cellHeight + 3 * padding,
        };
        break;

      case 'grid-auto':
        // 自动网格
        const cols = Math.ceil(Math.sqrt(images.length));
        const rows = Math.ceil(images.length / cols);
        const autoCellWidth = 180;
        const autoCellHeight = 180;
        
        newImages = images.map((img, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          
          return {
            ...img,
            x: col * (autoCellWidth + padding) + padding,
            y: row * (autoCellHeight + padding) + padding,
            width: Math.min(img.width, autoCellWidth),
            height: Math.min(img.height, autoCellHeight),
            rotation: 0,
            flipX: false,
            flipY: false,
          };
        });
        
        newCanvasSettings = {
          ...canvasSettings,
          width: cols * autoCellWidth + (cols + 1) * padding,
          height: rows * autoCellHeight + (rows + 1) * padding,
        };
        break;
    }

    onImagesUpdate(newImages);
    onCanvasUpdate(newCanvasSettings);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">快速布局</h4>
      <div className="grid grid-cols-2 gap-2">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => applyLayout(layout.id)}
            className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            title={layout.description}
          >
            <div className="flex items-center justify-center w-8 h-8 mb-2 text-gray-600 group-hover:text-blue-600">
              {layout.icon}
            </div>
            <span className="text-xs text-gray-700 group-hover:text-blue-700">
              {layout.name}
            </span>
          </button>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        💡 选择一个布局快速排列您的图片
      </div>
    </div>
  );
} 