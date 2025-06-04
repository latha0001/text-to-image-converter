import React from 'react';
import { Theme } from '../types';

interface ImageDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  theme: Theme;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, isLoading, theme }) => {
  return (
    <div className={`w-full h-64 md:h-80 rounded-md overflow-hidden relative ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
    }`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute text-sm mt-20">Generating image...</div>
        </div>
      ) : imageSrc ? (
        <img  src={imageSrc}  alt="Generated"  className="w-full h-full object-cover"/>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Your generated image will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;