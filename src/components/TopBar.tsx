import React, { ReactNode } from 'react';
import { File } from '@/lib/types';

interface TopBarProps {
  openFiles: File[];
  activeFile: File;
  onTabSelect: (file: File) => void;
  onCloseTab: (file: File) => void;
  children?: ReactNode; // <-- Add this line
}

const TopBar: React.FC<TopBarProps> = ({ openFiles, activeFile, onTabSelect, onCloseTab, children }) => {
  return (
    <div className="flex items-center bg-gray-900 text-white px-4 py-2 space-x-2 overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.name}
          onClick={() => onTabSelect(file)}
          className={`flex items-center cursor-pointer px-3 py-1 rounded ${
            file.name === activeFile.name ? 'bg-blue-600' : 'hover:bg-blue-700'
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
      {children}
    </div>
  );
};

export default TopBar;
