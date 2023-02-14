//language image logo


import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { aura, auraInit } from '@uiw/codemirror-theme-aura';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { FiCopy } from 'react-icons/fi';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { TbCircleCheck } from 'react-icons/tb'
import { useRecoilValue } from 'recoil';
import screenViews from '../recoil/screenView';


interface Props {
    title: string,
    onchange: Function,
    copy: Function,
    active: boolean,
    logo: JSX.Element,
    language: string,
    extension: Function,
    setActive: Function,
    resetActiveEditor: Function,
    value: string,
}

const Editor: React.FC<Props> = ({ title, language, onchange, copy, active, logo, extension, setActive, resetActiveEditor, value }): JSX.Element => {
    const [copied, setCopied] = useState<boolean>();
    const screenView = useRecoilValue(screenViews);

    return (
        <div
            style={screenView.resized ? { height: "100%", minHeight: "300px" } : {}}
            className={"editor-container " + (active === true ? ' active' : " noActive")}  >
            <div className="editor-title w-full h-10 bg-[#050509] flex justify-between items-center border-b-[#21202e] border-b-[4px] ">
                {/* <h1>{title}</h1> */}
                <button className='bg-[#21202e] h-full w-[6rem] text-white flex items-center justify-center gap-2  border-gray-600 border-t-4'>
                    {logo}
                    <p className='text-[14px]'>{title}</p>
                </button>

                <div className="p-4 flex gap-3 items-center">
                    <div className="relative">
                        {copied &&
                            <div className="flex items-center gap-2 justify-center text-center absolute w-24 rounded-sm h-10 bg-black border-[#ffffff70] border right-3 z-50 top-3">
                                <TbCircleCheck className='text-green-300 text-sm' />
                                <p className='text-white text-center text-sm'>copied</p>
                            </div>
                        }
                        <FiCopy onClick={() => {
                            setCopied(true);
                            copy("javascript")
                            setTimeout(() => {
                                setCopied(false);
                            }, 500);

                        }} className='text-white cursor-pointer active:text-green-400 duration-100 active:scale-[1.8]' />
                    </div>

                    {!screenView.resized &&
                        <>

                            {
                                active ?
                                    <TbLayoutSidebarRightExpand onClick={() => resetActiveEditor()} className='text-green-300 text-[1.4rem] cursor-pointer' /> :
                                    <TbLayoutSidebarLeftExpand onClick={() => setActive()} className='text-white text-[1.4rem] cursor-pointer' />
                            }
                        </>
                    }

                </div>
            </div>
            {/*  */}

            

            {/* 445px */}
            <CodeMirror
                value={value}
                maxHeight='500px'
                height='100%'
                minHeight='320px'
                className='editor'
                extensions={[extension({})]}
                lang='javascript'
                onChange={(value: string) => onchange(value, language)}
                theme={aura}
                style={{
                    border: "solid  0px",
                    position: "absolute",
                    overflowY: "auto",
                    overflowX: "clip",
                    width: '100%',
                    maxHeight: '500px',
                    minHeight: "500px",
                    height: '100%',
                }}
            />
        </div>
    )
};

export default Editor;
