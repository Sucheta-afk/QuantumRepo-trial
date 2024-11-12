import React, { useState } from 'react';
import { File } from '@/lib/types';

interface FileManagerProps {
  repoName: string;
  files: File[];
  onFileSelect: (file: File) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ repoName, files, onFileSelect }) => {
  // State to track open folders
  const [isFolderOpen, setIsFolderOpen] = useState<{ [key: string]: boolean }>({});
  const [allFiles, setAllFiles] = useState<File[]>(files);

  const toggleFolder = (folderName: string) => {
    setIsFolderOpen((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  // Group files by folders
  const groupedFiles = allFiles.reduce<{ [key: string]: File[] }>((acc, file) => {
    const parts = file.name.split('/');
    const folder = parts.length > 1 ? parts[0] : '';
    const fileName = parts.length > 1 ? parts.slice(1).join('/') : parts[0];

    if (folder) {
      if (!acc[folder]) {
        acc[folder] = [];
      }
      acc[folder].push({ name: fileName, content: file.content });
    } else {
      if (!acc['root']) {
        acc['root'] = [];
      }
      acc['root'].push(file);
    }

    return acc;
  }, {});

  // Function to add a new file
  const createNewFile = () => {
    const fileName = prompt('Enter the new file name:');
    if (fileName) {
      setAllFiles((prev) => [...prev, { name: fileName, content: '' }]);
    }
  };

  // Function to add a new folder
  const createNewFolder = () => {
    const folderName = prompt('Enter the new folder name:');
    if (folderName) {
      setAllFiles((prev) => [...prev, { name: `${folderName}/newFile.js`, content: '' }]);
    }
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 overflow-y-auto">
      {/* Display Repository Name */}
      <h3 className="text-lg font-semibold mb-4">{repoName}</h3>

      {/* Buttons for creating new files and folders */}
      <div className="mb-4">
        <button
          onClick={createNewFolder}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mb-2 w-full"
        >
          + Create Folder
        </button>
        <button
          onClick={createNewFile}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded w-full"
        >
          + Create File
        </button>
      </div>

      {/* File Explorer */}
      <ul className="space-y-2">
        {/* Render files in the root directory */}
        {groupedFiles['root']?.map((file) => (
          <li key={file.name} className="cursor-pointer px-4 rounded hover:bg-gray-700">
            <div onClick={() => onFileSelect(file)}>{file.name}</div>
          </li>
        ))}

        {/* Render folders */}
        {Object.keys(groupedFiles)
          .filter((key) => key !== 'root')
          .map((folder) => (
            <li key={folder}>
              {/* Folder item */}
              <div
                onClick={() => toggleFolder(folder)}
                className="flex items-center cursor-pointer"
              >
                <span className="mr-2">
                  {isFolderOpen[folder] ? '📂' : '📁'}
                </span>
                {folder}
              </div>

              {/* Render files inside the folder if it's open */}
              {isFolderOpen[folder] && (
                <ul className="pl-6 pt-1">
                  {groupedFiles[folder].map((file) => (
                    <li
                      key={file.name}
                      onClick={() => onFileSelect({ name: `${folder}/${file.name}`, content: file.content })}
                      className="cursor-pointer hover:bg-gray-500 px-2 rounded"
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileManager;
