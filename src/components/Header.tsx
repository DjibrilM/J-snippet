import React from "react";
import logo from '../assets/images/4997543.png'

const Header = () => {
  return <header className="h-[5rem] border-b border-[#ffffff29] bg-[#010103f2] flex items-center px-5">
    <div className=" flex items-center gap-2">
      <img src={logo} alt="" className="w-10" />
      <h1 className="text-[1.3rem] text-white flex items-center"><span className="text-blue-400 text-4xl">J</span>simplify.</h1>
    </div>
  </header>;
};

export default Header;
