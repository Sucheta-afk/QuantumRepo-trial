import React, { useState } from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

interface CodeEditorProps {
  language?: string;
  theme?: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  theme = "vs-dark",
  value,
  onChange,
}) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [originalValue] = useState(value);

  const handleEditorChange: OnChange = (newValue) => {
    onChange(newValue);

    if (editor && newValue !== undefined) {
      const model = editor.getModel();
      if (model) {
        const changes = model.getValue() !== originalValue;
        editor.deltaDecorations(
          [],
          changes
            ? [
                {
                  range: model.getFullModelRange(),
                  options: { inlineClassName: "modified-line" },
                },
              ]
            : []
        );
      }
    }
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          wordWrap: "on",
          minimap: { enabled: false },
        }}
        onMount={(editorInstance) => setEditor(editorInstance)}
      />
    </div>
  );
};

export default CodeEditor;
