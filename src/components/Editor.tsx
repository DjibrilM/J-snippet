//language image logo 
import javasciptLogo from '../assets/images/pngegg.png';
import cssLogo from '../assets/images/css-3.png';
import htmlogo from '../assets/images/html.png';

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { aura, auraInit } from '@uiw/codemirror-theme-aura';
import { androidstudio, androidstudioInit } from '@uiw/codemirror-theme-androidstudio';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { FiCopy } from 'react-icons/fi'
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb'



interface Props {
    title: string,
    language: string,
    onchange: Function,
    copy: Function,
}

const Editor: React.FC<Props> = ({ title, language, onchange, copy }): JSX.Element => {


    const [activeEditor, setActiveEditor] = useState<{
        editor: string,
        active: boolean,
    }[]>([

        {
            editor: "html",
            active: false
        },
        {
            editor: "css",
            active: false
        },
        {
            editor: "javascript",
            active: false
        },

    ]);


    const setActive = (language: string) => {



        const previousValue: any = [...activeEditor];
        const index = previousValue.findIndex((el: any) => {
            return el.active === true
        })
        const languageIndex = previousValue.findIndex((el: any) => {
            return el.editor === language;
        })

        console.log(languageIndex);

        previousValue[index].active = false;
        previousValue[languageIndex].active = true;

        // setActiveEditor([...previousValue]);
    }

    switch (language) {
        case "javascript":
            return (
                <div className={`editor-container   ${activeEditor[2].active === true ? 'active' : "notActive"}`}  >
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center border-b-[#21202e] border-b-[4px] ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={javasciptLogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4 flex gap-3 items-center">
                            <FiCopy onClick={() => copy("javascript")} className='text-white cursor-pointer active:text-green-400 duration-100 active:scale-[1.8]' />
                            <TbLayoutSidebarLeftExpand className='text-white text-[1.4rem] cursor-pointer' onClick={() => setActive('javascript')} />
                        </div>
                    </div>

                    <CodeMirror
                        maxHeight='500px'
                        height='100%'
                        minHeight='200px'
                        className='editor'
                        extensions={[javascript({})]}
                        lang='javascript'
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
                        style={{
                            border: "solid  0px",
                            position: "absolute",
                            overflow: "auto",
                            width: '100%',
                            maxHeight: '500px',
                            height: '100%',
                        }}
                    />
                </div>
            )
        case "html":
            return (
                <div className={"editor-container  "}>
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={htmlogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4 flex gap-3 items-center">
                            <FiCopy onClick={() => copy("html")} className='text-white cursor-pointer active:text-green-400 duration-100 active:scale-[1.8]' />
                            <TbLayoutSidebarLeftExpand className='text-white text-[1.4rem] cursor-pointer' onClick={() => setActive('html')} />
                        </div>
                    </div>

                    <CodeMirror
                        className='editor'
                        height="500px"
                        width='100%'
                        extensions={[html(),]}
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
                        style={{
                            border: "solid  0px",
                            position: "absolute",
                            overflow: "auto",
                            width: '100%',
                            maxHeight: '500px',
                            height: '100%',
                        }}
                    />
                </div>
            )
        case "css":
            return (
                <div className="editor-container ">
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={cssLogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4 flex gap-5 items-center">
                            <FiCopy onClick={() => copy("css")} className='text-white cursor-pointer active:text-green-400 duration-100 active:scale-[1.8]' />
                            <TbLayoutSidebarLeftExpand className='text-white text-[1.4rem] cursor-pointer' onClick={() => setActive('css')} />
                        </div>
                    </div>


                    <CodeMirror
                        className='editor'
                        height="500px"
                        width='100%'
                        extensions={[css()]}
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
                        style={{
                            border: "solid  0px",
                            position: "absolute",
                            overflow: "auto",
                            width: '100%',
                            maxHeight: '500px',
                            height: '100%',
                        }}
                    />
                </div>
            )
            break;
        default:
            return <></>
            break;
    }
    ;
};

export default Editor;
