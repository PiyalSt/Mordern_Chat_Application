import React from "react";
import assets from "../assets/assets";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { HiHandThumbUp } from "react-icons/hi2";
import { FaRegComments } from "react-icons/fa";
import { BiSolidShareAlt } from "react-icons/bi";

const PostCard = () => {
  return (
    <>
      <div className="bg-primary/10 px-4 py-2 rounded-md">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12">
                <img className="w-full" src={assets.user_icon} alt="" />
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-800">Naruto Uzumaki</h2>
                <p className="text-xs font-medium text-gray-600">7 july, 2026</p>
              </div>
            </div>
            <div>
              <IoMdCloseCircleOutline className="text-2xl text-gray-800 cursor-pointer active:scale-95" />
            </div>
          </div>
          <div className="w-full py-3">
            <p className="text-sm text-gray-800 font-normal">"A small river besides our home"🍀🕊️</p>
          </div>
        </div>
        <div className="w-full h-[90%] rounded-md">
          <img className="w-full rounded-md" src={assets.post_image_01} alt="" />
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-10 py-2">
            <div className="flex items-center gap-2 px-2 cursor-pointer active:scale-95">
              <HiHandThumbUp className="text-2xl text-gray-800"/>
              <p className="text-base text-gray-800 font-normal">140k</p>
            </div>
            <div className="flex items-center gap-2 px-2 cursor-pointer active:scale-95">
              <FaRegComments className="text-2xl text-gray-800"/>
              <p className="text-base text-gray-800 font-normal">1.4k</p>
            </div>
            <div className="flex items-center gap-2 px-2 cursor-pointer active:scale-95">
              <BiSolidShareAlt className="text-2xl text-gray-800"/>
              <p className="text-base text-gray-800 font-normal">3k</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div>
              <p className="text-xl">😍</p>
            </div>
            <div>
              <p className="text-xl">😎</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
