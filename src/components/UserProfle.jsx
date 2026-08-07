import React from "react";
import assets from "../assets/assets";

const UserProfle = ({ userName, btnText, onclick, onclickTwo, cencelBtn }) => {
  return (
    <>
      <div className="cursor-pointer flex justify-between py-3 px-2 bg-primary/10 hover:bg-primary/20 transition-all duration-300 rounded-md">
        <div className="flex items-center gap-2">
          <div className="w-12">
            <img src={assets.user_icon} alt="" />
          </div>
          <div>
            <p className="text-base text-gray-800 font-normal">{userName}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {btnText && (
            <button
              onClick={onclick}
              className="px-3 py-1 bg-primary/90 rounded-full text-xs text-gray-100 cursor-pointer"
            >
              {btnText}
            </button>
          )}
          {cencelBtn && (
            <button
              onClick={onclickTwo}
              className="px-3 py-1 bg-primary/90 rounded-full text-xs text-gray-100 cursor-pointer"
            >
              {cencelBtn}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfle;
