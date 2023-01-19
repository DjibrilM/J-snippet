import React from 'react';
import Editor from './components/Editor';
import { useState } from 'react';
import { useTransition } from 'react';
import Header from './components/Header';
import { useEffect } from 'react';


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



const editedDoc = (html: string, style: string, javscript: string) => {
  return `
  <html>
    <head>
       <style>
         ${style}
       </style>
    </head>
    <body>
      ${html}

      <script>
      ${javscript}
   </script>
    </body>
  </html>
  `
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



  const editedCode =
    `<html>
  <head>
     <style>
       ${editor['css'].codes}
     </style>

  </head>

  
  <body>
    ${editor['html'].codes}

    <script>
    ${editor['javascript'].codes}
  </script>
  </body>
</html>
`


  return (
    <>
      <Header />
      <div className="pen top-pen flex w-full  bg-[#050509] gap-5">
        <Editor
          onchange={(value: string, language: string) => {
            edit(value, language);
          }}
          title='HTML'
          language='html' />

        <div className="h-full flex w-full duration-500  overflow-hidden">
          <Editor
            onchange={(value: string, language: string) => {
              edit(value, language);
            }}
            title='CSS'
            language='css' />

        </div>

        <div className="w-full h-full flex">
          <Editor
            onchange={(value: string, language: string) => {
              edit(value, language);
            }}
            title='JS'
            language='javascript' />
        </div>
      </div>

      <div className="pen bottom-pen h-[100vh] w-full  ">
        <div className="h-12 mt-10 w-full border-y">
          <div className="flex h-full items-center  ml-5 gap-8">
            <div className="w-4 h-4 rounded-full bg-green-300"></div>
            <div className="w-4 h-4 rounded-full bg-orange-300"></div>
            <div className="w-4 h-4 rounded-full bg-blue-300"></div>
          </div>
        </div>
        <iframe
          srcDoc={editedCode}
          title='output'
          frameBorder={0}
          width={'100%'}
          height={'100%'}
          allow-modals={true}
        >
        </iframe>
      </div>
    </>
  );
}

export default App;
