"use client";

import { useState } from 'react';
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

  const [files] = useState<File[]>(initialFiles);
  const [openFiles, setOpenFiles] = useState<File[]>([initialFiles[0]]);
  const [selectedFile, setSelectedFile] = useState<File>(initialFiles[0]);

  const handleFileSelect = (file: File) => {
    if (!openFiles.some((f) => f.name === file.name)) {
      setOpenFiles([...openFiles, file]);
    }
    setSelectedFile(file);
  };

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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
      <FileManager repoName="My Awesome Repo" files={initialFiles} onFileSelect={(file) => console.log(file)} />
        <div className="flex flex-col flex-grow">
          <TopBar openFiles={openFiles} activeFile={selectedFile} onTabSelect={handleTabSelect} onCloseTab={handleCloseTab} />
          <CodeEditor
            language="javascript"
            value={selectedFile.content}
            onChange={handleCodeChange}
            key={selectedFile.name}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;