
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import javasciptLogo from './assets/images/pngegg.png';
import cssLogo from './assets/images/css-3.png';
import htmlogo from './assets/images/html.png';
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
  const [Editors, setEditors] =
    useState<{
      title: string,
      language: string,
      active: boolean,
      logo: JSX.Element,
      extension: Function,
      value: string
    }[]>([
      {
        title: 'HTML',
        language: "html",
        active: false,
        logo: (<img src={htmlogo} alt="jslogo" className='w-7' />),
        extension: () => html(),
        value: ""
      },
      {
        title: 'CSS',
        language: "css",
        active: false,
        logo: (<img src={cssLogo} alt="jslogo" className='w-7' />),
        extension: () => css(),
        value: ""
      },
      {
        title: 'JS',
        language: "javascript",
        active: false,
        logo: (<img src={javasciptLogo} alt="jslogo" className='w-7' />),
        extension: () => javascript(),
        value: ""
      }
    ]);

  const edit = (value: string, language: string) => {

    try {
      startEditing(() => {
        console.log('hiting')
        const previousValue: any = editor;
        previousValue[language].codes = value;
        setEditor({ ...previousValue });
      })
    } catch (error) {
      alert('enable to edit')
    }
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

  const setActiveEditor = (index: number) => {
    const prevValue: {
      title: string,
      language: string,
      active: boolean,
      logo: JSX.Element,
      extension: Function,
      value: string
    }[] = [...Editors];

    const prevActive = prevValue.findIndex((el: any) => el.active === true);
    if (prevActive > -1) prevValue[prevActive].active = false
    prevValue[index].active = true;
    setEditors([...prevValue]);
  }

  const resetActiveEditor = () => {
    const prevValue = [...Editors];
    const prevActive = prevValue.findIndex((el) => {
      return el.active === true
    })
    prevValue[prevActive].active = false;
    setEditors([...prevValue]);
  }

  const storeToLocalStorage = () => {
    const convertCodeToArray = [editor];
    const convertToJson = JSON.stringify(convertCodeToArray);
    localStorage.setItem('codes', convertToJson);
  }


  //get stored codes
  useEffect(() => {
    const prevEditors = Editors;
    const getCodes: any = localStorage.getItem('codes');
    if(!getCodes) return
    const convertToArray: [] | any = JSON.parse(getCodes);
    const maped = prevEditors.map((el, index) => {
      const convert = convertToArray[0];
      const code = convert[el.language].codes;
      return {
        ...el,
        value: code,
      }
    })

    edit(convertToArray[0].javascript.codes, 'javascript');
    edit(convertToArray[0].html.codes, 'html');
    edit(convertToArray[0].css.codes, 'css');
    setEditors([...maped]);
  }, []);


  return (
    <>
      <Header storeCode={() => storeToLocalStorage()} />
      <div className="pen top-pen flex w-full  bg-[#050509] gap-5">

        {
          Editors.map((editor: any, index: number) => {
            return (
              <Editor
                onchange={(value: string, language: string) => {
                  edit(value, language);
                }}
                copy={copyText}
                title={editor.title}
                language={editor.language}
                logo={editor.logo}
                extension={editor.extension}
                active={editor.active}
                setActive={() => setActiveEditor(index)}
                resetActiveEditor={() => resetActiveEditor()}
                value={editor.value}
              />
            )
          })
        }
        
      </div>
      <div className="w-full h-10 border-t flex items-center pl-2 border-b bg-black relative bottom-2 border-[#ffffff53]">
        <p className='text-[#ffffff82] tracking-widest	'>save : Ctrl + S</p>
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
          srcDoc={editedDoc(editor['html'].codes, editor['css'].codes, editor['javascript'].codes)}
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
