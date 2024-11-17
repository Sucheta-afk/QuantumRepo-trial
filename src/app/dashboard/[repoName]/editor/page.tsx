"use client"; // Ensure this is a client-side component

import { useState, useEffect, useCallback } from 'react';
import { FaSave, FaCloudUploadAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import CodeEditor from '@/components/Editor';
import FileManager from '@/components/FileManager';
import TopBar from '@/components/TopBar';
import { File } from '@/lib/types';

const EditorPage: React.FC = () => {
  const initialFiles: File[] = [
    { name: 'index.js', content: '// index.js content' },
    { name: 'App.js', content: '// App.js content' },
    { name: 'style.css', content: '/* style.css content */' },
    { name: 'folder1/file1.js', content: '// file1.js content' },
    { name: 'folder1/file2.js', content: '// file2.js content' },
    { name: 'folder2/file1.js', content: '// file1.js content' },
    { name: 'folder2/file2.js', content: '// file2.js content' },
  ];

  const [files, setFiles] = useState<File[]>(initialFiles);
  const [openFiles, setOpenFiles] = useState<File[]>([initialFiles[0]]);
  const [selectedFile, setSelectedFile] = useState<File>(initialFiles[0]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for commit message
  const [commitMessage, setCommitMessage] = useState(''); // State for commit message
  const [isClient, setIsClient] = useState(false); // Check if it's client-side

  useEffect(() => {
    setIsClient(true); // Mark component as client-side once mounted
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (!openFiles.some((f) => f.name === file.name)) {
      setOpenFiles([...openFiles, file]);
    }
    setSelectedFile(file);
  }, [openFiles]);

  const handleTabSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleCloseTab = (file: File) => {
    setOpenFiles((prevOpenFiles) => prevOpenFiles.filter((f) => f.name !== file.name));
    if (selectedFile.name === file.name && openFiles.length > 1) {
      const nextFile = openFiles.find((f) => f.name !== file.name);
      if (nextFile) setSelectedFile(nextFile);
    }
  };

  const handleCodeChange = (newContent: string | undefined) => {
    setSelectedFile((prevFile) => ({ ...prevFile, content: newContent || '' }));
  };

  // Toggle commit message modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle publishing (placeholder for publishing logic)
  const handlePublish = () => {
    console.log("Publishing with commit message:", commitMessage);
    setIsModalOpen(false);
    setCommitMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar with Save and Publish Buttons */}
      <TopBar
        openFiles={openFiles}
        activeFile={selectedFile}
        onTabSelect={handleTabSelect}
        onCloseTab={handleCloseTab}
      >
        <button onClick={() => console.log("File saved")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          <FaSave className="inline mr-2" /> Save
        </button>
        <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2">
          <FaCloudUploadAlt className="inline mr-2" /> Publish
        </button>
      </TopBar>

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* File Manager with drag-and-drop */}
        <FileManager 
          repoName="My Awesome Repo" 
          files={files} 
          onFileSelect={handleFileSelect} 
          onFileCreate={(newFile) => setFiles([...files, newFile])}
          onFileMove={(sourceFile, destinationFolder) => {
            const updatedFiles = files.map((file) => 
              file.name === sourceFile.name ? { ...file, name: `${destinationFolder}/${file.name.split('/').pop()}` } : file
            );
            setFiles(updatedFiles);
          }}
        />

        {/* Code Editor */}
        <div className="flex flex-col flex-grow">
          <CodeEditor
            language="javascript"
            value={selectedFile.content}
            onChange={handleCodeChange}
            key={selectedFile.name}
          />
        </div>
      </div>

      {/* Commit Message Modal */}
      {isClient && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Commit Message"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl font-bold mb-4">Commit Message</h2>
          <input
            type="text"
            placeholder="Enter commit message..."
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="mt-4 flex justify-end">
            <button onClick={toggleModal} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">
              Cancel
            </button>
            <button onClick={handlePublish} className="px-4 py-2 bg-blue-500 text-white rounded">
              Publish
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditorPage;
