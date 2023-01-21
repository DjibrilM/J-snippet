import React, { CSSProperties } from "react";
import logo from '../assets/images/4997543.png';
import { BsSaveFill } from 'react-icons/bs';
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "./spinner";
import { MdOutlineDeleteOutline } from 'react-icons/md'

interface Props {
  storeCode: Function
}

const Header: React.FC<Props> = ({ storeCode }) => {
  const [saveLoading, setSaveLoading] = useState<boolean>();
  const [clearLoading, setClearLing] = useState<boolean>();

  const store = () => {
    setSaveLoading(true);
    storeCode()
    setTimeout(() => {
      setSaveLoading(false);
    }, 1000);
  }


  const clear = () => {

  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        const getSaveButton = document.querySelector('.saveBtn') as HTMLButtonElement;
        // Add your code here
        getSaveButton.click();
      }
    })

  }, []);


  return <header className="h-[5rem] border-b border-[#ffffff29] bg-[#010103f2] justify-between flex items-center px-5">
    <div className=" flex items-center gap-2">
      <img src={logo} alt="" className="w-10" />
      <h1 className="text-[1.3rem] text-white flex items-center"><span className="text-blue-400 text-4xl">J</span>snippet.</h1>
    </div>


    <div className="flex h-full items-center gap-4">
      <button onClick={() => storeCode()} className="w-32 justify-center h-10 rounded-sm active:bg-gray-600 bg-gray-500 text-white uppercase flex items-center gap-1" >
        {/* <Spinner /> */}

        <>
          <MdOutlineDeleteOutline />
          clear
        </>
      </button>

      <button onClick={() => store()} className="w-32 justify-center h-10 rounded-sm active:bg-blue-600 bg-blue-400 text-white uppercase flex items-center gap-1 saveBtn" >

        {
          saveLoading ? <Spinner /> :
            <>
              <BsSaveFill />
              save
            </>
        }

      </button>
    </div>
  </header>;
};

export default Header;
