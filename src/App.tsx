import React, { useState } from 'react';
import { Sun, Moon, Zap, History, Bookmark, Download, RefreshCw, ChevronRight } from 'lucide-react';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import ModelViewer from './components/ModelViewer';
import CreationHistory from './components/CreationHistory';
import GenerationStatus from './components/GenerationStatus';
import { Creation } from './types';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'enhancing' | 'image' | 'model'>('idle');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedModel, setGeneratedModel] = useState<string | null>(null);
  const [creationHistory, setCreationHistory] = useState<Creation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const generateCreation = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setCurrentStep('enhancing');
    setGeneratedImage(null);
    setGeneratedModel(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep('image');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      const randomImageId = Math.floor(Math.random() * 1000);
      const imageSrc = `https://picsum.photos/seed/${randomImageId}/800/600`;
      setGeneratedImage(imageSrc);
      setCurrentStep('model');
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      setGeneratedModel('example-model-url');
      setCurrentStep('idle');
    
      const newCreation: Creation = {
        id: Date.now().toString(), prompt, enhancedPrompt: `Enhanced: ${prompt} with vibrant colors, detailed textures, and dramatic lighting.`, timestamp: new Date(), imageSrc, modelSrc: 'example-model-url', favorite: false
      };
      
      setCreationHistory(prev => [newCreation, ...prev]);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setCreationHistory(prev => 
      prev.map(creation => 
        creation.id === id 
          ? { ...creation, favorite: !creation.favorite } 
          : creation
      )
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`py-4 px-6 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center">
          <Zap className="text-blue-500 mr-2" size={24} />
          <h1 className="text-xl font-bold">AI Forge</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button  onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
            <History size={20} />
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <PromptInput  prompt={prompt} setPrompt={setPrompt} onGenerate={generateCreation} isGenerating={isGenerating} theme={theme}/>
        </div>
        
        {isGenerating && (
          <div className="lg:col-span-3">
            <GenerationStatus currentStep={currentStep} theme={theme} />
          </div>
        )}
        
        <div className={`lg:col-span-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 order-2 lg:order-1`}>
          <h2 className="text-lg font-semibold mb-4">Creation Pipeline</h2>
          <div className="flex flex-col space-y-4">
            <div className={`p-3 rounded-md flex items-center ${currentStep === 'enhancing' ? 'bg-blue-500/20 border border-blue-500' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep === 'enhancing' ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                1
              </div>
              <div>
                <h3 className="font-medium">LLM Enhancement</h3>
                <p className="text-sm opacity-70">Expanding your prompt with creative details</p>
              </div>
              {currentStep === 'enhancing' && <RefreshCw size={18} className="ml-auto animate-spin" />}
            </div>
            
            <div className={`p-3 rounded-md flex items-center ${currentStep === 'image' ? 'bg-purple-500/20 border border-purple-500' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep === 'image' ? 'bg-purple-500 text-white' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                2
              </div>
              <div>
                <h3 className="font-medium">Image Generation</h3>
                <p className="text-sm opacity-70">Creating visual representation</p>
              </div>
              {currentStep === 'image' && <RefreshCw size={18} className="ml-auto animate-spin" />}
            </div>
            
            <div className={`p-3 rounded-md flex items-center ${currentStep === 'model' ? 'bg-green-500/20 border border-green-500' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep === 'model' ? 'bg-green-500 text-white' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                3
              </div>
              <div>
                <h3 className="font-medium">3D Model Generation</h3>
                <p className="text-sm opacity-70">Converting image to 3D model</p>
              </div>
              {currentStep === 'model' && <RefreshCw size={18} className="ml-auto animate-spin" />}
            </div>
            
            {prompt && currentStep !== 'idle' && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Current Prompt:</h3>
                <div className={`p-3 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {prompt}
                </div>
                
                {currentStep !== 'enhancing' && (
                  <>
                    <h3 className="font-medium mb-2 mt-4">Enhanced Prompt:</h3>
                    <div className={`p-3 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      Enhanced: {prompt} with vibrant colors, detailed textures, and dramatic lighting.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {(generatedImage || isGenerating) && (
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 flex flex-col h-full`}>
                <h2 className="text-lg font-semibold mb-4">Generated Image</h2>
                <div className="flex-grow">
                  <ImageDisplay  imageSrc={generatedImage}  isLoading={currentStep === 'image'}  theme={theme}/>
                </div>
              </div>
            )}
            
            {(generatedModel || currentStep === 'model') && (
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 flex flex-col h-full`}>
                <h2 className="text-lg font-semibold mb-4">3D Model</h2>
                <div className="flex-grow">
                  <ModelViewer  modelSrc={generatedModel}  isLoading={currentStep === 'model'}  theme={theme} />
                </div>
                {generatedModel && (
                  <button className={`mt-4 flex items-center justify-center py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                    <Download size={18} className="mr-2" />
                    Download 3D Model
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {showHistory && (
        <CreationHistory  creations={creationHistory}  onClose={() => setShowHistory(false)}  toggleFavorite={toggleFavorite} theme={theme}/>
      )}
    </div>
  );
}

export default App;