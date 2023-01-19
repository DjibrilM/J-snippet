//language image logo 
import javasciptLogo from '../assets/images/pngegg.png';
import cssLogo from '../assets/images/css-3.png';
import htmlogo from '../assets/images/html.png';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { aura, auraInit } from '@uiw/codemirror-theme-aura';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { FiCopy } from 'react-icons/fi'
const code = 'console.log("hello world!");';


interface Props {
    title: string,
    language: string,
    onchange: Function
}

const Editor: React.FC<Props> = ({ title, language, onchange }): JSX.Element => {


    switch (language) {
        case "javascript":
            return (
                <div className="editor-container">
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={javasciptLogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4">
                            <FiCopy className='text-white cursor-pointer' />
                        </div>
                    </div>

                    <CodeMirror
                        className='editor'
                        height="500px"
                        width='100%'
                        extensions={[javascript()]}
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
                    />
                </div>
            )
        case "html":
            return (
                <div className="editor-container ">
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={htmlogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4">
                            <FiCopy className='text-white cursor-pointer' />
                        </div>
                    </div>

                    <CodeMirror
                        className='editor'
                        height="500px"
                        width='100%'
                        extensions={[html()]}
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
                    />
                </div>
            )
        case "css":
            return (
                <div className=" editor-container ">
                    <div className="editor-title w-full h-14 bg-[#050509] flex justify-between items-center ">
                        {/* <h1>{title}</h1> */}
                        <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                            <img src={cssLogo} alt="jslogo" className='w-7' />
                            {title}
                        </button>

                        <div className="p-4">
                            <FiCopy className='text-white cursor-pointer' />
                        </div>
                    </div>


                    <CodeMirror
                        className='editor'
                        height="500px"
                        width='100%'
                        extensions={[css()]}
                        onChange={(value: string) => onchange(value, language)}
                        theme={aura}
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
