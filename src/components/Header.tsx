import React, { CSSProperties } from "react";
import logo from '../assets/images/4997543.png';
import { BsSaveFill } from 'react-icons/bs';
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "./spinner";


interface Props {
  storeCode: Function
}

const Header: React.FC<Props> = ({ storeCode }) => {
  const [saveLoading, setSaveLoading] = useState<boolean>();

  useEffect(() => {

  }, []);



  return <header className="h-[5rem] border-b border-[#ffffff29] bg-[#010103f2] justify-between flex items-center px-5">
    <div className=" flex items-center gap-2">
      <img src={logo} alt="" className="w-10" />
      <h1 className="text-[1.3rem] text-white flex items-center"><span className="text-blue-400 text-4xl">J</span>snippet.</h1>
    </div>

    <button onClick={() => storeCode()} className="px-10 py-2 rounded-md active:bg-blue-600 bg-blue-400 text-white uppercase flex items-center gap-1" >

      <Spinner />
      <BsSaveFill />
      save
    </button>
  </header>;
};

export default Header;
