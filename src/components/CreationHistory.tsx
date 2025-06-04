import React, { useState } from 'react';
import { X, Star, Search, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Creation, Theme } from '../types';

interface CreationHistoryProps {
  creations: Creation[];
  onClose: () => void;
  toggleFavorite: (id: string) => void;
  theme: Theme;
}

const CreationHistory: React.FC<CreationHistoryProps> = ({ 
  creations, 
  onClose,
  toggleFavorite,
  theme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };
  
  const filteredCreations = creations.filter(creation => {
    if (showFavoritesOnly && !creation.favorite) return false;
    return creation.prompt.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const sortedCreations = [...filteredCreations].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else {
      return a.timestamp.getTime() - b.timestamp.getTime();
    }
  });
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
        <div className={`p-4 flex justify-between items-center border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className="text-xl font-semibold">Creation History</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
            <X size={20} />
          </button>
        </div>
        
        <div className={`p-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 ${
          theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'
        }`}>
          <div className="relative flex-grow">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} size={18} />
            <input type="text" placeholder="Search by prompt..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 border-gray-600' 
                  : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400 border-gray-300'
              } border focus:ring-2 focus:outline-none`}/>
          </div>
          
          <div className="flex space-x-2">
            <button onClick={toggleSortOrder}
              className={`flex items-center px-3 py-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              }`}>
              {sortOrder === 'newest' ? (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Newest
                </>
              ) : (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Oldest
                </>
              )}
            </button>
            
            <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center px-3 py-2 rounded-md ${
                showFavoritesOnly
                  ? theme === 'dark' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-yellow-500 text-white'
                  : theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              }`}>
              <Star size={16} className={`mr-1 ${showFavoritesOnly ? 'fill-white' : ''}`} />
              Favorites
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {sortedCreations.length === 0 ? (
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {creations.length === 0 ? (
                <p>Your creation history will appear here.</p>
              ) : (
                <p>No matching creations found.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCreations.map(creation => (
                <div  key={creation.id}
                  className={`rounded-lg overflow-hidden border ${
                    theme === 'dark' 
                      ? creation.favorite ? 'border-yellow-500/50' : 'border-gray-700' 
                      : creation.favorite ? 'border-yellow-400' : 'border-gray-200'
                  } transition-all duration-300 hover:shadow-lg`}>
                  <div className="relative h-40">
                    <img  src={creation.imageSrc}  alt={creation.prompt}  className="w-full h-full object-cover"/>
                    <button onClick={() => toggleFavorite(creation.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full ${
                        theme === 'dark' ? 'bg-black/40' : 'bg-white/70'
                      } hover:opacity-100 transition-opacity`}>
                      <Star 
                        size={18} 
                        className={`${
                          creation.favorite 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className={`p-3 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <p className="font-medium line-clamp-2 mb-2">{creation.prompt}</p>
                    
                    <div className="flex items-center text-xs opacity-70 mb-1">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(creation.timestamp)}
                      <span className="mx-1">•</span>
                      <Clock size={12} className="mr-1" />
                      {formatTime(creation.timestamp)}
                    </div>
                    
                    <div className="flex mt-3 space-x-2">
                      <button className={`text-xs py-1 px-2 rounded ${
                        theme === 'dark' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        View Image
                      </button>
                      <button className={`text-xs py-1 px-2 rounded ${
                        theme === 'dark' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        View 3D Model
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreationHistory;