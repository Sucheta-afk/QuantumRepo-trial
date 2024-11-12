import React from 'react';
import { File } from '@/lib/types';

interface TopBarProps {
    openFiles: File[];
    activeFile: File;
    onTabSelect: (file: File) => void;
    onCloseTab: (file: File) => void;
  }
  
  const TopBar: React.FC<TopBarProps> = ({ openFiles, activeFile, onTabSelect, onCloseTab }) => {
    return (
      <div className="flex items-center bg-gray-900 text-white px-4 py-2 space-x-2">
        {openFiles.map((file) => (
          <div
            key={file.name}
            onClick={() => onTabSelect(file)}
            className={`flex items-center cursor-pointer px-3 py-1 rounded ${
              file.name === activeFile.name ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            {file.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(file);
              }}
              className="ml-2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default TopBar;