'use client';

import { Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">图片拼接工具</h1>
            <p className="text-sm text-gray-600">免费在线合并多张图片</p>
          </div>
        </div>
      </div>
    </header>
  );
} 