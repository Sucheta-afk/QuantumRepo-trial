import React from 'react';
import MonacoEditor, { OnChange, EditorProps } from '@monaco-editor/react';

interface CodeEditorProps {
  language?: string;
  theme?: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language = 'javascript', theme = 'vs-dark', value, onChange }) => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={(newValue) => onChange(newValue)}
        options={{
          fontSize: 14,
          wordWrap: 'on',
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
