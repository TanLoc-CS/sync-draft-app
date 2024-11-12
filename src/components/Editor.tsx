import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

export interface EditorProps {
  onChange?: (value: string) => void,
  content?: any,
  editable?: boolean
}

const Editor: React.FC<EditorProps> = ({ onChange, content, editable=true }) => {
  const colors = {
    highlight: [
      "#FFFF00", // Yellow (Most common highlight color)
      "#90EE90", // Light Green
      "#ADD8E6", // Light Blue
      "#D3D3D3", // Light Gray (Subtle highlight)
    ],
    text: [
      'black',
      'white',
      'red',
      "#4A4A4A", // Dark Gray (Secondary text or less emphasis)
      "#A9A9A9", // Light Gray (For annotations, footnotes)
      "#000080", // Navy Blue (Titles, headings, or emphasis)
      "#654321", // Dark Brown (Elegant headings or subtle emphasis)
      "#228B22", // Forest Green (For light emphasis or headers)
      "#800020", // Burgundy (For subtle, sophisticated emphasis)
      "#2F4F4F", // Dark Slate Gray
      "#191970"  // Midnight Blue (Professional look for titles or headings)
    ]
  }

  const formats: string[] = [
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'color',
    'background'
  ];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike',],
      [{ color: colors.text }],
      [{ background: colors.highlight }],
      ['link'],
      ['clean']
    ]
  }

  const noToolbarModule = {
    toolbar: false
  }

  return editable? (
    <ReactQuill 
      className='h-[720px] mt-6'
      placeholder='Hello, World!'
      theme='snow'
      formats={formats}
      modules={modules}
      value={content}
      onChange={onChange}
    />
  ) : (
    <ReactQuill
      className='w-full h-full'
      theme='snow'
      modules={noToolbarModule}
      value={content}
      readOnly
    />
  )
}

export default Editor