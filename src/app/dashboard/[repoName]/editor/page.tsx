"use client";

import { useState, useEffect, useCallback } from "react";
import { FaSave } from "react-icons/fa";
import CodeEditor from "@/components/Editor";
import FileManager from "@/components/FileManager";
import TopBar from "@/components/TopBar";
import axios from "axios";
import useCheckAuth from "@/utils/checkAuth";
import { File } from "@/lib/types";
import { useParams } from "next/navigation";

const initialFiles: File[] = [];

const EditorPage = () => {
  const params = useParams();
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, loading: authLoading, isAuthenticated } = useCheckAuth();
  const repoName = Array.isArray(params.repoName) ? params.repoName[0] : params.repoName;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!authLoading && isAuthenticated && user?.uid) {
          const response = await axios.get(`/api/repos/${user.uid}/${repoName}/files`);
          setFiles(response.data);

          if (response.data.length > 0) {
            const firstFile = response.data[0];
            setSelectedFile({
              ...firstFile,
              content: firstFile.content || "", // handle missing content
            });
            setOpenFiles([firstFile]);
          }
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [repoName, authLoading, isAuthenticated, user?.uid]);

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
    if (selectedFile?.name === file.name && openFiles.length > 1) {
      const nextFile = openFiles.find((f) => f.name !== file.name);
      if (nextFile) setSelectedFile(nextFile);
    }
  };

  const handleCodeChange = (newContent: string | undefined) => {
    if (selectedFile) {
      setSelectedFile((prevFile) => ({
        ...prevFile!,
        content: newContent || "",
      }));
    }
  };

  // Handle saving individual file content
  const handleSaveFile = async () => {
    if (selectedFile) {
      try {
        const sanitizedFileName = selectedFile.name.startsWith('root/')
          ? selectedFile.name.replace('root/', '')
          : selectedFile.name;

        const response = await axios.patch(`/api/repos/${user.uid}/${repoName}/files/${sanitizedFileName}`, {
          content: selectedFile.content,
        });

        console.log("File saved:", response.data);
      } catch (error) {
        console.error("Error saving file:", error);
      }
    }
  };

  // Handle adding a new file
  const handleAddFile = async (newFile: File) => {
    try {
      const response = await axios.post(`/api/repos/${user.uid}/${repoName}/files`, {
        name: newFile.name, 
        content: newFile.content || "",
      });
      
      setFiles((prevFiles) => [...prevFiles, response.data]);
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  // Handle deleting a file
  const handleDeleteFile = async (fileName: string) => {
    try {
      const sanitizedFileName = fileName.replace(/^root\//, "");

      await axios.delete(`/api/repos/${user.uid}/${repoName}/files/${sanitizedFileName}`);
      setFiles((prevFiles) => prevFiles.filter((f) => f.name !== sanitizedFileName));

      if (selectedFile?.name === sanitizedFileName && openFiles.length > 1) {
        const nextFile = openFiles.find((f) => f.name !== sanitizedFileName);
        if (nextFile) setSelectedFile(nextFile);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        openFiles={openFiles}
        activeFile={selectedFile || { name: "", content: "" }}
        onTabSelect={handleTabSelect}
        onCloseTab={handleCloseTab}
      >
        <button onClick={handleSaveFile} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          <FaSave className="inline mr-2" /> Save
        </button>
      </TopBar>

      <div className="flex flex-grow">
        <FileManager
          repoName={repoName}
          files={files}
          onFileSelect={handleFileSelect}
          onFileCreate={handleAddFile}
          onFileDelete={handleDeleteFile}
        />
        <div className="flex flex-col flex-grow">
          {selectedFile && (
            <CodeEditor
              language="javascript"
              value={selectedFile.content || ""}
              onChange={handleCodeChange}
              key={selectedFile.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
