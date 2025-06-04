import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { Theme } from '../types';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  theme: Theme;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isGenerating,
  theme
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };
  
  const suggestions = [
    "Glowing dragon standing on a cliff at sunset",
    "Cyberpunk city skyline at night",
    "Floating islands with waterfalls and rainbow bridges",
    "Ancient temple ruins in a jungle with mystical fog"
  ];
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center mb-4">
        <Sparkles className="text-blue-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold">Create Something Magical</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className={`relative flex items-center transition-all duration-300 ${isFocused ? (theme === 'dark' ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400') : ''}`}>
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Describe your imagination..."
            className={`w-full py-3 px-4 rounded-l-lg outline-none ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            }`}
            disabled={isGenerating}/>
          <button type="submit" disabled={isGenerating || !prompt.trim()}
            className={`flex items-center justify-center h-full px-6 rounded-r-lg transition-colors ${
              isGenerating || !prompt.trim()
                ? (theme === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500')
                : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600')
            }`} >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
      
      {!isGenerating && (
        <div className="mt-4">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button key={index} onClick={() => setPrompt(suggestion)}
                className={`text-sm py-1.5 px-3 rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}>
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptInput;