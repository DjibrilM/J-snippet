import React from "react";
import { FaRegTrashAlt } from 'react-icons/fa'
import { ImWarning } from 'react-icons/im'
import { motion } from "framer-motion"
import Spinner from "./spinner";
import { useState } from "react";

interface Props {
    clear: Function,
    cancel: Function,
}

const Warnning: React.FC<Props> = ({ clear, cancel }) => {
    const [clearLoading, setClearLoading] = useState<boolean>();

    return <motion.div
        initial={{
            y: -1000
        }}
        animate={{
            y: 0
        }}

        className="max-w-[500px] w-full min-[200px]:  h-[300px] bg-[#020202] border-[#ffffff37] border pt-10">
        <div className="w-full flex items-center justify-center mb-16">
            <ImWarning className="text-yellow-300 text-5xl" />
        </div>
        <p className="text-center text-white relative bottom-10">All your progresses will be deleted and you can't cancel this process </p>
        <div className="flex items-center justify-center w-full gap-5 mt-5">

            <button
                disabled={clearLoading && true}
                className="h-12 w-[10rem] rounded-sm  bg-red-400 text-white active:bg-red-500 flex items-center justify-center" onClick={() => {
                    clear()
                    setClearLoading(true);
                }}>
                {!clearLoading ?
                    <>
                        <FaRegTrashAlt className="relative right-2" />
                        clear All
                    </> :
                    < Spinner />
                }
            </button>
            <button
                disabled={clearLoading && true}
                onClick={() => { cancel() }} className="py-3 px-14 rounded-sm  bg-green-400 text-white active:bg-green-500">cancel</button>
        </div>
    </motion.div>;
};

export default Warnning;
