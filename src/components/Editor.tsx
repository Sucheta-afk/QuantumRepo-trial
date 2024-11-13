import React, { useEffect, useState } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';

interface CodeEditorProps {
  language?: string;
  theme?: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language = 'javascript', theme = 'vs-dark', value, onChange }) => {
  const [editor, setEditor] = useState<any>(null);
  const [originalValue] = useState(value);

  // Track changes and update decorations for modified lines
  const handleEditorChange: OnChange = (newValue) => {
    onChange(newValue);

    if (editor && newValue !== undefined) {
      const changes = editor.getModel().getValue() !== originalValue;
      editor.deltaDecorations(
        [],
        changes
          ? [
              {
                range: editor.getModel().getFullModelRange(),
                options: { inlineClassName: 'modified-line' },
              },
            ]
          : []
      );
    }
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          wordWrap: 'on',
          minimap: { enabled: false },
        }}
        onMount={(editorInstance) => setEditor(editorInstance)}
      />
    </div>
  );
};

export default CodeEditor;
