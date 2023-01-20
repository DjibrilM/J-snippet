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
  const [Editors, setEditors] = useState<{
    title: string,
    language: string,
  }[]>([
    {
      title: 'HTML',
      language: "html"
    },
    {
      title: 'CSS',
      language: "css"
    },
    {
      title: 'JS',
      language: "javascript",
    }
  ]);

  const edit = (value: string, language: string) => {
    startEditing(() => {
      const previousValue: any = editor;
      previousValue[language].codes = value;
      setEditor({ ...previousValue });
    })
  }

  

  const copyText = (language: string) => {
    switch (language) {
      case "javascript":
        navigator.clipboard.writeText(editor['javascript'].codes).then(result => {
          // alert('copied' + 'rrrrr')
        }).catch(error => {
          alert('fail to copy')
        })
        break
      case "css":
        navigator.clipboard.writeText(editor['css'].codes).then(result => {
          // alert('copied' + 'rrrrr')
        }).catch(error => {
          alert('fail to copy')
        })
        break;
      case "html":
        navigator.clipboard.writeText(editor['javascript'].codes).then(result => {
          // alert('copied' + 'rrrrr')
        }).catch(error => {
          alert('fail to copy')
        })
        break
      default:
        break;
    }


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

        {
          Editors.map((editor: any) => {
            return (
              <Editor
                onchange={(value: string, language: string) => {
                  edit(value, language);
                }}
                copy={copyText}
                title={editor.title}
                language={editor.language} />
            )
          })
        }
      </div>

      <div className="pen bottom-pen h-[100vh] w-full  ">
        <div className="h-12 mt-10 w-full border-y">
          <div className="flex h-full items-center  ml-5 gap-8">
            <div className="w-4 h-4 rounded-full bg-[#f96057]"></div>
            <div className="w-4 h-4 rounded-full bg-[#f8ce52]"></div>
            <div className="w-4 h-4 rounded-full bg-[#5fcf65]"></div>
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
