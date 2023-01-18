import React from 'react';
import Editor from './components/Editor';
import { useState } from 'react';
import { useTransition } from 'react';
import Header from './components/Header';


const initialState: {

  javascript: {
    codes: string,
  }
  html: {
    codes: string,
  },
  css: {
    codes: string,
  }
} = {
  javascript: {
    codes: "",
  },
  css: {
    codes: "",
  },
  html: {
    codes: ""
  }
}

const App = () => {
  const [editor, setEditor] = useState<any>(initialState);
  const [editing, startEditing] = useTransition();

  const edit = (value: string, language: string) => {
    startEditing(() => {
      const previousValue: any = editor;
      previousValue[language].codes = value;
      setEditor({ ...previousValue });
    })
  }

  return (
    <>
      <Header />
      <div className="pen top-pen flex w-full  bg-[#050509] gap-3">
        <Editor
          onchange={(value: string, language: string) => {
            edit(value, language);
          }}
          title='HTML'
          language='html' />
        <Editor
          onchange={(value: string, language: string) => {
            edit(value, language);
          }}
          title='CSS'
          language='css' />
        <Editor
          onchange={(value: string, language: string) => {
            edit(value, language);
          }}
          title='JS'
          language='javascript' />
      </div>

      <div className="pen bottom-pen">
        <iframe src=""
          title='output'
          sandbox='allow-scripts'
          frameBorder={0}
          width={'100%'}
          height={'100%'}
        ></iframe>
      </div>
    </>
  );
}

export default App;
