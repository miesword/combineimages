'use client';

import { 
  Smartphone, 
  Layers, 
  Palette, 
  RotateCw, 
  Download, 
  Shield,
  Zap,
  Grid
} from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "直观设计",
      description: "简洁友好的用户界面，让图片拼接变得简单易用，人人都能快速上手。"
    },
    {
      icon: <Grid className="w-8 h-8 text-green-600" />,
      title: "多种布局",
      description: "支持水平、垂直和网格排列，自由组合多张图片创建独特的拼接效果。"
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "自定义样式",
      description: "调整图片间距、添加彩色边框、设置背景颜色，创造专属的设计风格。"
    },
    {
      icon: <RotateCw className="w-8 h-8 text-orange-600" />,
      title: "拖拽重排",
      description: "通过拖拽图片缩略图或使用排序按钮，轻松调整图片在拼接中的位置。"
    },
    {
      icon: <Download className="w-8 h-8 text-red-600" />,
      title: "即时下载",
      description: "一键下载高质量PNG格式的拼接图片，满足各种使用需求。"
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "隐私安全",
      description: "所有图片处理都在本地浏览器中完成，绝不上传到服务器，保护您的隐私。"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择我们的图片拼接工具？
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们的免费图片拼接工具帮助您轻松合并多张照片，创建精美的拼接效果。
            无论是制作社交媒体内容、整理旅行回忆，还是制作照片礼品，这个简单而强大的工具都能满足您的需求。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                开始使用图片拼接工具
              </h3>
              <p className="text-gray-700 mb-4">
                免费、快速、安全的在线图片拼接工具。无需注册，即上传即使用！
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>支持多种图片格式（JPG、PNG、GIF、WebP）</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>无文件大小限制</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>支持手机、平板和桌面设备</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>完全免费，无水印</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 