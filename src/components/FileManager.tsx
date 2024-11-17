import React, { useState } from 'react';
import Modal from 'react-modal';
import { File } from '@/lib/types';
import { FaFile, FaFolder, FaJs, FaCss3Alt, FaHtml5, FaPython, FaReact, FaFolderOpen  } from 'react-icons/fa';

interface FileManagerProps {
  repoName: string;
  files: File[];
  onFileSelect: (file: File) => void;
  onFileCreate: (newFile: File) => void;
  onFileDelete: (fileName: string) => void; 
}

const FileManager: React.FC<FileManagerProps> = ({ repoName, files, onFileSelect, onFileCreate, onFileDelete }) => {
  const [isFolderOpen, setIsFolderOpen] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('root');

  const toggleFolder = (folderName: string) => {
    setIsFolderOpen((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const groupedFiles = files.reduce<{ [key: string]: File[] }>((acc, file) => {
    const parts = file.name.split('/');
    const folder = parts.length > 1 ? parts[0] : 'root';
    const fileName = parts.slice(1).join('/') || parts[0];

    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push({ name: fileName, content: file.content });

    return acc;
  }, {});

  const createNewFile = () => {
    setIsModalOpen(true);
  };

  const handleFileCreate = () => {
    if (newFileName.trim()) {
      const filePath = selectedFolder === 'root' ? newFileName : `${selectedFolder}/${newFileName}`;
      const newFile = { name: filePath, content: '' };
      onFileCreate(newFile);
      setIsModalOpen(false);
      setNewFileName('');
      setSelectedFolder('root');
    }
  };

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
        return <FaJs />;
      case 'css':
        return <FaCss3Alt />;
      case 'html':
        return <FaHtml5 />;
      case 'py':
        return <FaPython />;
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FaReact />;
      default:
        return <FaFile />;
    }
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">{repoName}</h3>

      <div className="mb-4">
        <button
          onClick={createNewFile}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mb-2 w-full"
        >
          + Create File
        </button>
      </div>

      <ul className="space-y-2">
        {Object.keys(groupedFiles).map((folder) => (
          <li key={folder}>
            <div
              onClick={() => toggleFolder(folder)}
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">{isFolderOpen[folder] ? <FaFolderOpen /> : <FaFolder />}</span>
              {folder}
            </div>
            {isFolderOpen[folder] && (
              <ul className="pl-6 pt-1">
                {groupedFiles[folder].map((file) => (
                  <li
                    key={file.name}
                    onClick={() => onFileSelect({ name: `${folder}/${file.name}`, content: file.content })}
                    className="cursor-pointer hover:bg-gray-500 px-2 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.name)}
                      <span>{file.name}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); onFileDelete(`${folder}/${file.name}`); }}
                        className="ml-2 text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Create New File</h2>
        <div className="mb-4">
          <label className="block text-sm text-white mb-2">File Name:</label>
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
            placeholder="Enter file name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-white mb-2">Select Folder:</label>
          <select
            value={selectedFolder}
            onChange={(e) => handleFolderSelect(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          >
            {Object.keys(groupedFiles).map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleFileCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FileManager;
