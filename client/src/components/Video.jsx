import React from "react";
import samplevideo from "../assets/samplevideo.mp4";
import { FiClipboard } from "react-icons/fi";
import { copy } from "../utils/copyClipboard";

function Video(props) {
  return (
    <div className=" flex flex-col items-center justify-center mt-16">
      <video playsInline autoPlay muted loop className="border rounded-2xl">
        <source src={samplevideo} type="video/mp4" />
      </video>

      <div className="bg-black px-6 rounded-2xl text-white w-1/2 py-6 mt-10 mb-10">
        <div className="flex mb-5">
          <div className="bg-[#F87171] rounded-full p-[6px]"></div>
          <div className="bg-[#FACC15] rounded-full p-[6px] ml-2"></div>
          <div className="bg-[#4ADE80] rounded-full p-[6px] ml-2"></div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm tracking-tight" id="repoLink">
            {props.gitrepo}
          </p>
          <FiClipboard
            className="cursor-pointer"
            color="white "
            onClick={() => copy(props.gitrepo)}
          />
        </div>
      </div>
    </div>
  );
}

export default Video;
