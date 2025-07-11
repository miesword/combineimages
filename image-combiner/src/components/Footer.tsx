'use client';

import { Layers, Mail, Github, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">图片拼接工具</h3>
                <p className="text-gray-400 text-sm">免费在线合并多张图片</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              简单、快速、安全的在线图片拼接工具。支持多种图片格式，
              提供丰富的自定义选项，让您轻松创建专业级的图片拼接效果。
              所有处理都在本地完成，保护您的隐私安全。
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:support@example.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
                <span>联系我们</span>
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
                <span>开源代码</span>
              </a>
            </div>
          </div>

          {/* 功能特性 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">主要功能</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  图片上传
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  拖拽排序
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  实时预览
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  自定义样式
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  高质量导出
                </a>
              </li>
            </ul>
          </div>

          {/* 帮助支持 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">帮助支持</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  使用教程
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  服务条款
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  联系支持
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 技术栈信息 */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} 图片拼接工具. 保留所有权利.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>技术栈:</span>
              <span className="bg-gray-800 px-2 py-1 rounded">Next.js</span>
              <span className="bg-gray-800 px-2 py-1 rounded">React</span>
              <span className="bg-gray-800 px-2 py-1 rounded">Konva.js</span>
              <span className="bg-gray-800 px-2 py-1 rounded">Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* 额外信息 */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <span>用</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>制作 · 免费开源 · 保护隐私</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 