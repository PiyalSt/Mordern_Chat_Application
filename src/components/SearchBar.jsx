import React from "react";
import assets from "../assets/assets";
import { IoMdImages } from "react-icons/io";
import { BsSend } from "react-icons/bs";

const SearchBar = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4 py-4 bg-primary/10 px-4 rounded-md">
        <div className="w-12">
          <img className="w-full" src={assets.user_icon} alt="" />
        </div>
        <div className="w-full relative">
          <input
            className="w-full flex-1 py-3 px-4 pr-14 border border-primary/20 rounded-md shadow outline-0 text-gray-700"
            type="text"
            placeholder="What's your mind ?"
          />
          <IoMdImages className="absolute text-3xl text-gray-800 cursor-pointer active:scale-95 top-2 right-4" />
        </div>
        <div>
          <BsSend className="text-2xl text-gray-800 cursor-pointer active:scale-95" />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
