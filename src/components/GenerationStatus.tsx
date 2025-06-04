import React from 'react';
import { Theme } from '../types';

interface GenerationStatusProps {
  currentStep: 'idle' | 'enhancing' | 'image' | 'model';
  theme: Theme;
}

const GenerationStatus: React.FC<GenerationStatusProps> = ({ currentStep, theme }) => {
  const steps = [
    { id: 'enhancing', label: 'Enhancing Prompt', color: 'blue' },
    { id: 'image', label: 'Generating Image', color: 'purple' },
    { id: 'model', label: 'Creating 3D Model', color: 'green' }
  ];
  
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };
  
  const getProgressPercentage = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };
  
  return (
    <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-lg font-semibold mb-4">Generation Progress</h2>
      
      <div className="relative mb-6">
        <div 
          className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className={`h-2 rounded-full ${
              currentStep === 'enhancing' ? 'bg-blue-500' :
              currentStep === 'image' ? 'bg-purple-500' : 'bg-green-500'
            } transition-all duration-500 ease-in-out`}
            style={{ width: `${getProgressPercentage()}%` }} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isPast = getCurrentStepIndex() > index;
          const color = step.color as 'blue' | 'purple' | 'green';
          
          return (
            <div 
              key={step.id} 
              className={`p-4 rounded-lg border ${
                isCurrent 
                  ? `border-${color}-500 ${theme === 'dark' ? `bg-${color}-500/20` : `bg-${color}-100`}`
                  : theme === 'dark' 
                    ? isPast ? `border-${color}-500 bg-${color}-500/10` : 'border-gray-700 bg-gray-700' 
                    : isPast ? `border-${color}-300 bg-${color}-50` : 'border-gray-200 bg-gray-50'
              } transition-all duration-300`}>
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  isCurrent || isPast
                    ? `bg-${color}-${theme === 'dark' ? '500' : '400'} text-white`
                    : theme === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500'
                }`}>
                  {isPast ? '✓' : index + 1}
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    isCurrent 
                      ? `text-${color}-${theme === 'dark' ? '400' : '600'}`
                      : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
              
              {isCurrent && (
                <div className="mt-3 pl-9">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 bg-${color}-${theme === 'dark' ? '400' : '500'} animate-pulse`} />
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {currentStep === 'enhancing' && 'Analyzing and expanding your prompt...'}
                      {currentStep === 'image' && 'Crafting visual representation...'}
                      {currentStep === 'model' && 'Building 3D geometry and textures...'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenerationStatus;