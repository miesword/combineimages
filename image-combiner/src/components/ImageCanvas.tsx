'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import { ImageItem, CanvasSettings } from '@/app/page';
import Konva from 'konva';

interface ImageCanvasProps {
  images: ImageItem[];
  canvasSettings: CanvasSettings;
  selectedImageId: string | null;
  onImageUpdate: (id: string, updates: Partial<ImageItem>) => void;
  onImageSelect: (id: string | null) => void;
}

const ImageCanvas = forwardRef<Konva.Stage, ImageCanvasProps>(
  ({ images, canvasSettings, selectedImageId, onImageUpdate, onImageSelect }, ref) => {
    const [imageElements, setImageElements] = useState<{ [key: string]: HTMLImageElement }>({});
    const transformerRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);

    // 预加载图片
    useEffect(() => {
      const loadImages = async () => {
        const newImageElements: { [key: string]: HTMLImageElement } = {};
        
        for (const imageItem of images) {
          if (!imageElements[imageItem.id]) {
            const img = new window.Image();
            img.crossOrigin = 'anonymous';
            
            await new Promise((resolve) => {
              img.onload = resolve;
              img.src = imageItem.url;
            });
            
            newImageElements[imageItem.id] = img;
          } else {
            newImageElements[imageItem.id] = imageElements[imageItem.id];
          }
        }
        
        setImageElements(newImageElements);
      };
      
      if (images.length > 0) {
        loadImages();
      }
    }, [images]);

    // 选择图片时更新transformer
    useEffect(() => {
      if (transformerRef.current && stageRef.current) {
        const selectedNode = stageRef.current.findOne(`#${selectedImageId}`);
        if (selectedNode) {
          transformerRef.current.nodes([selectedNode]);
          transformerRef.current.getLayer()?.batchDraw();
        } else {
          transformerRef.current.nodes([]);
        }
      }
    }, [selectedImageId]);

    // 暴露stage引用给父组件（用于导出）
    useEffect(() => {
      if (ref && typeof ref !== 'function') {
        ref.current = stageRef.current;
      }
    }, [ref]);

    const handleImageClick = (id: string) => {
      onImageSelect(selectedImageId === id ? null : id);
    };

    const handleImageDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
      const node = e.target;
      onImageUpdate(id, {
        x: node.x(),
        y: node.y(),
      });
    };

    const handleTransformEnd = (id: string, e: Konva.KonvaEventObject<Event>) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      
      // 重置scale并更新width/height
      node.scaleX(1);
      node.scaleY(1);
      
      onImageUpdate(id, {
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      });
    };

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      // 点击空白区域取消选择
      if (e.target === e.target.getStage()) {
        onImageSelect(null);
      }
    };

    return (
      <div className="border rounded-lg overflow-hidden bg-gray-100">
        <Stage
          ref={stageRef}
          width={canvasSettings.width}
          height={canvasSettings.height}
          onClick={handleStageClick}
          style={{ 
            backgroundColor: canvasSettings.backgroundColor,
            border: `${canvasSettings.borderWidth}px solid ${canvasSettings.borderColor}`
          }}
        >
          <Layer>
            {images.map((imageItem) => {
              const imageElement = imageElements[imageItem.id];
              if (!imageElement) return null;

              return (
                <KonvaImage
                  key={imageItem.id}
                  id={imageItem.id}
                  image={imageElement}
                  x={imageItem.x}
                  y={imageItem.y}
                  width={imageItem.width}
                  height={imageItem.height}
                  rotation={imageItem.rotation}
                  scaleX={imageItem.flipX ? -1 : 1}
                  scaleY={imageItem.flipY ? -1 : 1}
                  opacity={imageItem.opacity}
                  draggable
                  onClick={() => handleImageClick(imageItem.id)}
                  onDragEnd={(e) => handleImageDragEnd(imageItem.id, e)}
                  onTransformEnd={(e) => handleTransformEnd(imageItem.id, e)}
                />
              );
            })}
            
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // 限制最小尺寸
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
              enabledAnchors={[
                'top-left', 'top-center', 'top-right',
                'middle-left', 'middle-right',
                'bottom-left', 'bottom-center', 'bottom-right'
              ]}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
);

ImageCanvas.displayName = 'ImageCanvas';

export default ImageCanvas; 