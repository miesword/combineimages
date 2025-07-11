'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "一次可以拼接多少张图片？",
      answer: "我们的图片拼接工具支持同时拼接多张图片，没有数量限制。工具会自动调整布局以适应多张照片的组合。为了获得最佳性能，建议每次处理的图片总大小不超过设备内存限制。"
    },
    {
      question: "可以自定义图片之间的间距吗？",
      answer: "当然可以！我们的图片拼接工具提供了可调节的间距控制功能。您可以设置0到50像素的间距，以获得完美的图片间距效果，让您的拼接作品更加专业美观。"
    },
    {
      question: "能否为图片添加边框？",
      answer: "绝对可以。您可以添加自定义宽度、颜色和样式的边框（实线、虚线或点线），创建专业级的照片拼接效果。边框设置让您的作品更具视觉冲击力。"
    },
    {
      question: "上传的图片文件大小有限制吗？",
      answer: "由于所有图片处理都在您的浏览器中本地完成，文件大小限制主要取决于您设备的内存容量。为了确保最佳性能和用户体验，我们建议单个图片文件大小控制在10MB以内。"
    },
    {
      question: "使用图片拼接工具时，我的图片会被保存到服务器吗？",
      answer: "绝对不会。我们的图片拼接工具完全在本地浏览器中处理所有操作，您的图片永远不会上传到任何服务器。这确保了您的隐私安全和数据保护，您可以放心使用。"
    },
    {
      question: "图片拼接工具支持哪些图片格式？",
      answer: "我们的工具支持所有常见的图片格式，包括JPG、PNG、GIF和WebP。无论您使用哪种格式的图片，都可以轻松进行拼接处理。"
    },
    {
      question: "可以在手机上使用这个图片拼接工具吗？",
      answer: "当然可以！我们的图片拼接工具采用响应式设计，完美适配智能手机、平板电脑和台式电脑。无论您使用什么设备，都能享受流畅的拼接体验。"
    },
    {
      question: "拼接完成的图片可以保存为什么格式？",
      answer: "目前支持保存为高质量的PNG格式，这种格式能够保持图片的清晰度和色彩准确性。PNG格式支持透明背景，适合各种用途的图片处理需求。"
    },
    {
      question: "如何调整图片在拼接中的位置？",
      answer: "您可以通过多种方式调整图片位置：1）直接在画布上拖拽图片；2）在控制面板中精确输入坐标值；3）使用图片列表进行排序。这些功能让您能够精确控制每张图片的位置。"
    },
    {
      question: "拼接的图片质量会下降吗？",
      answer: "不会。我们的工具使用高质量的图片处理算法，确保拼接后的图片保持原始的清晰度和色彩质量。您还可以在设置中调整导出质量，以满足不同用途的需求。"
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mr-3">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              关于图片拼接工具的常见问题
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            以下是用户最常询问的问题和详细解答，帮助您更好地使用我们的图片拼接工具。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {expandedIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              还有其他问题？
            </h3>
            <p className="text-gray-600 mb-6">
              如果您在使用图片拼接工具时遇到任何问题，或者需要更多帮助，
              请随时通过以下方式联系我们的支持团队。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@example.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                发送邮件咨询
              </a>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                查看使用教程
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 