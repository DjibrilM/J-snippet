import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import javasciptLogo from './assets/images/pngegg.png';
import cssLogo from './assets/images/css-3.png';
import htmlogo from './assets/images/html.png';
import Editor from './components/Editor';
import { useState } from 'react';
import { useTransition } from 'react';
import Header from './components/Header';
import { useEffect } from 'react';
import screenViews from './recoil/screenView';
import { useRecoilValue } from 'recoil';

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
      try {
        ${javscript}
      } catch (error) {
        console.log(error);
      }    
   </script>
    </body>
  </html>
  `
}

const App = () => {
  const [editor, setEditor] = useState<any>(initialState);
  const [editing, startEditing] = useTransition();
  const screenView = useRecoilValue(screenViews);

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
        logo: (<img src={htmlogo} alt="jslogo" className='w-5' />),
        extension: () => html(),
        value: ""
      },
      {
        title: 'CSS',
        language: "css",
        active: false,
        logo: (<img src={cssLogo} alt="jslogo" className='w-5' />),
        extension: () => css(),
        value: ""
      },
      {
        title: 'JS',
        language: "javascript",
        active: false,
        logo: (<img src={javasciptLogo} alt="jslogo" className='w-5' />),
        extension: () => javascript(),
        value: ""
      }
    ]);

  const edit = (value: string, language: string) => {




    try {
      startEditing(() => {
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
        navigator.clipboard.writeText(editor['html'].codes).then(result => {
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

  //get stored 
  const updateCleaning = () => {
    const prevEditors = Editors;
    const maped = prevEditors.map((el, index) => {
      return {
        ...el,
        value: " ",
      }
    })


    edit(' ', 'javascript');
    edit(' ', 'html');
    edit('', 'css');
    setEditors([...maped]);
  }

  //get stored codes when loading the page 
  useEffect(() => {
    const prevEditors = Editors;
    const getCodes: any = localStorage.getItem('codes');
    if (!getCodes) return
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


  useEffect(() => {
    const prevValue = [...Editors];
    const findActiveEditor = prevValue.findIndex((el) => {
      return el.active === true;
    })


    if (screenView.resized && findActiveEditor > -1) {
      prevValue[findActiveEditor].active = false;
      setEditors([...prevValue])
    }

  }, [screenView])

  return (
    <>

      <Header
        updateCleaning={() => {
          updateCleaning();
        }}
        storeCode={() => {
          storeToLocalStorage()
        }}
      />

      <section
        style={screenView.resized ? { display: "flex", flexDirection: `${screenView.right ? "row-reverse" : "row"}` } : {}}
        className='w-full h-full'>
        <div className="pen top-pen relative flex w-full border-r   bg-[#050509] gap-5"
          style={screenView.resized ? {
            maxWidth: "450px",
            height: "100vh",
            overflow: "auto",
            width: "100%",
            flexDirection: "column",
            gap: '5px',
          } : {}}>

          {
            Editors.map((editor: any, index: number) => {
              return (
                <Editor
                  key={index}
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
        <div style={screenView.resized ? { display: "none" } : {}} className="w-full h-10 border-t flex items-center pl-2 border-b bg-black relative bottom-2 border-[#ffffff53]">
          <p className='text-[#ffffff82] tracking-widest	'>save : Ctrl + Q</p>
        </div>
        <div className="pen bottom-pen h-[90vh] w-full  ">
          <div className="h-12 w-full border-y">
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
      </section>
    </>
  );
}

export default App;
