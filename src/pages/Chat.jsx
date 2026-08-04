import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import UserProfle from "../components/UserProfle";
import assets from "../assets/assets";

const Chat = () => {
  return (
    <>
      <div className="w-full h-screen flex gap-2">
        <div className="w-8/12 h-full bg-primary/10 overflow-y-scroll ml-2">
          <div className="w-full py-4 px-4 border-b-2 border-primary/20">
          {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-12">
                  <img className="w-full" src={assets.user_icon} alt="" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-gray-800">
                    Naruto Uzumaki
                  </h2>
                  <p className="text-xs font-medium text-gray-600">
                    Online
                  </p>
                </div>
              </div>
              <div>
                <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
              </div>
            </div>
          </div>
          <div>
            {/* Chat Box */}
            <div className="w-full h-[80vh] px-4 py-4 flex flex-col gap-2 overflow-y-scroll">
              <div className="w-full flex justify-end">
                <div className="bg-primary/20 px-4 py-2 rounded-md">
                  <p>Hello How are you ?</p>
                </div>
              </div>
              <div className="w-full flex justify-start">
                <div className="bg-primary/20 px-4 py-2 rounded-md">
                  <p>Hello How are you ?</p>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="bg-primary/20 px-4 py-2 rounded-md">
                  <p>Hello How are you ?</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* message type box */}
            <div className="py-4 bg-amber-300">
              
              <div>
                <input type="text" placeholder="Type here..." />
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 h-full bg-primary/10">
          <div className="w-full h-screen px-4 py-4">
            <div className="w-full h-6/12">
              {/* Send Friend Request */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Friends</h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* user proflie list */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {/* {userData.map((item, index) => ( */}
                <UserProfle
                  // onclick={() => sendRequestHandle(item)}
                  // key={index}
                  btnText={"Add friend"}
                  // userName={item.userName}
                />
                {/* ))} */}
              </div>
            </div>
            <div className="w-full h-6/12">
              {/* Accept Friend Request */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20 mt-2">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Blocks</h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* user proflie list */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {/* {requestData.map((item, index) => ( */}
                <UserProfle
                  // key={index}
                  btnText={"Accept"}
                  // userName={item.senderName}
                />
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
