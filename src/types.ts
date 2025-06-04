export interface Creation {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  timestamp: Date;
  imageSrc: string;
  modelSrc: string;
  favorite: boolean;
}

export type Theme = 'light' | 'dark';