import React from 'react';
import { Cuboid as Cube } from 'lucide-react';
import { Theme } from '../types';

interface ModelViewerProps {
  modelSrc: string | null;
  isLoading: boolean;
  theme: Theme;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelSrc, isLoading, theme }) => {
  return (
    <div className={`w-full h-64 md:h-80 rounded-md overflow-hidden relative ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
    }`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute text-sm mt-20">Converting to 3D...</div>
        </div>
      ) : modelSrc ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse">
            <Cube size={64} className="text-blue-500" />
            <p className="text-center mt-4">3D Model Viewer</p>
            <p className="text-center text-sm opacity-70">(Placeholder for actual 3D viewer component)</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Your 3D model will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;