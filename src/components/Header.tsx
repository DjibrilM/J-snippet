import React from "react";
import logo from '../assets/images/4997543.png';
import { BsSaveFill } from 'react-icons/bs';
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "./spinner";
import { MdOutlineDeleteOutline } from 'react-icons/md'
import Backdrop from "./backdrop";
import leftViewImage from '../assets/images/left-view.svg';
import rightViewImage from '../assets/images/right-view.svg';
import bottomViewImage from '../assets/images/bottom-view.svg';
import screeView from "../recoil/screenView";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
  storeCode: Function,
  updateCleaning: Function
}


const Header: React.FC<Props> = ({ storeCode, updateCleaning }) => {
  const [saveLoading, setSaveLoading] = useState<boolean>();
  const [showClearModel, setShowClearModel] = useState<boolean>(false);
  const [showScreenSizer, setShowScreenSizer] = useState<boolean>(false);
  const [resizeToRight, setResizeToRight] = useState<boolean>();
  const [resizeToLeft, setResizeToLeft] = useState<boolean>();
  const [resizeBottom, setResizeBottom] = useState<boolean>();
  const [screenView, setScreenView] = useRecoilState(screeView);

  const store = () => {
    setSaveLoading(true);
    storeCode()
    setTimeout(() => {
      setSaveLoading(false);
    }, 1000);
  }


  const clear = () => {
    const deleteDatas = window.localStorage.removeItem('codes');

    setTimeout(() => {
      updateCleaning();
      setShowClearModel(false);
    }, 500);
  }

  const showClearModal = () => {
    setShowClearModel(true)
  }

  
  
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'q' && e.ctrlKey) {
        e.preventDefault();
        const getSaveButton = document.querySelector('.saveBtn') as HTMLButtonElement;
        getSaveButton.click();
      }
    })

  }, []);

  const changeView = (side: "left" | "right" | "bottom") => {
    switch (side) {
      case "left":
        setScreenView({ ...screenView, resized: true, left: true, right: false, bottom: false });
        break;
      case "right":
        setScreenView({ ...screenView, resized: true, left: false, right: true, bottom: false });
        break;
      case "bottom":
        setScreenView({ ...screenView, resized: false, left: false, right: false, bottom: true });
        break;
      default:
        break;
    }

  }

  return (
    <>
      {showClearModel && <Backdrop clear={() => clear()} cancel={() => setShowClearModel(false)} />}
      <header className="h-[5rem] border-b border-[#ffffff29] bg-[#010103f2] justify-between flex items-center px-5">
        <div className=" flex items-center gap-2">
          <img src={logo} alt="" className="w-10" />
          <h1 className="text-[1.3rem] text-white flex items-center"><span className="text-blue-400 text-4xl">J</span>snippet.</h1>
        </div>

        <div className="flex h-full items-center gap-4">
          <div className="relative">
            {showScreenSizer &&
              <>
                <div className="shadow-lg  border-4 border-[#ffffff12] w-[27rem] right-12 h-[11rem] p-4 rounded-md  absolute top-10 z-30 bg-[#0b0b13]">

                  <AiOutlineCloseCircle onClick={()=> setShowScreenSizer(!showScreenSizer)} className="absolute text-lg cursor-pointer text-white" />

                  <h1 className="text-[#ffffffc2] text-center mb-8">Change editor view </h1>

                  <div className="w-full h-20 rounded-md bg-[#ffffff12] flex gap-8 items-center justify-center">
                    <div onClick={() => {
                      changeView("left")
                      setResizeToRight(false)
                      setResizeToLeft(true)
                      setResizeBottom(false);
                    }} className="w-20 flex items-center justify-center">
                      <img src={leftViewImage} className="w-16 cursor-pointer" alt="" />
                    </div>

                    <div
                      className="w-20 flex items-center justify-center"
                    >
                      <img onClick={() => {
                        changeView("bottom")
                        setResizeBottom(true);
                        setResizeToRight(false)
                        setResizeToLeft(false)
                      }} src={bottomViewImage} className="w-14 cursor-pointer" alt="" />
                    </div>

                    <div
                      onClick={() => {
                        changeView("right");
                        setResizeToRight(true)
                        setResizeToLeft(false)
                        setResizeBottom(false);
                      }}
                      className="w-20 flex items-center justify-center">
                      <img src={rightViewImage} className="w-16 cursor-pointer" alt="" />
                    </div>
                  </div>
                </div>
              </>
            }

            <button onClick={() => setShowScreenSizer(!showScreenSizer)} className="w-20 justify-center h-10 rounded-sm active:bg-gray-600 bg-gray-500 text-white uppercase flex items-center gap-1" >
              <>
                <img src={bottomViewImage} className={`w-10 duration-300 ${resizeToRight && 'rotateToRight'} ${resizeToLeft && 'rotateToLeft'} ${resizeBottom && 'resize-bottom'}`} />
              </>
            </button>
          </div>

          <button onClick={() => showClearModal()} className="w-32 justify-center h-10 rounded-sm active:bg-gray-600 bg-gray-500 text-white uppercase flex items-center gap-1" >
            <>
              <MdOutlineDeleteOutline />
              clear
            </>
          </button>

          <button disabled={saveLoading && true} onClick={() => store()} className="w-32 justify-center h-10 rounded-sm active:bg-blue-600 bg-blue-400 text-white uppercase flex items-center gap-1 saveBtn" >

            {
              saveLoading ? <Spinner /> :
                <>
                  <BsSaveFill />
                  save
                </>
            }

          </button>
        </div>
      </header>
    </>
  )
    ;
};

export default Header;
