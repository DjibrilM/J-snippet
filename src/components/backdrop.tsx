import React from "react";
import Warnning from "./warnning";

interface Props {
    clear: Function,
    cancel: Function,
}

const backdrop: React.FC<Props> = ({ clear, cancel }) => {
    return <div className="w-full h-full bg-[#000000ba] top-0 fixed z-[1000] backdrop-blur-sm flex justify-center pt-20">
        <Warnning clear={() => {
            clear()
        }}
            cancel={() => {
                cancel()
            }}
        />
    </div>;
};

export default backdrop;
