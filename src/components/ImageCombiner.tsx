import { useUserAnalytics } from '../hooks/useUserAnalytics';

export function ImageCombiner() {
  const { trackEvent } = useUserAnalytics();

  const handleImageUpload = (imageCount: number) => {
    trackEvent('images_uploaded', {
      image_count: imageCount,
      feature: 'image_upload'
    });
  };

  const handleImageCombine = (settings: any) => {
    trackEvent('images_combined', {
      layout: settings.layout,
      image_count: settings.imageCount,
      output_format: settings.format,
      feature: 'image_combine'
    });
  };

  const handleDownload = (format: string, fileSize: number) => {
    trackEvent('image_downloaded', {
      format,
      file_size: fileSize,
      feature: 'download'
    });
  };

  // ... 其他组件逻辑
}