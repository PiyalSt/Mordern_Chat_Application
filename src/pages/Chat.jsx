import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import UserProfle from "../components/UserProfle";
import assets from "../assets/assets";
import { onValue, ref, remove, set } from "firebase/database";
import { database } from "../firebase/firebase.config";
import { toast, ToastContainer } from "react-toastify";

const Chat = () => {
  const [acceptRequest, setAcceptRequest] = useState([]);
  const [blockList, setBlockList] = useState([]);

  // ============= Get accept friend request list ============= //
  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, "accept_request/"),
      (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          arr.push({ id: item.key, ...item.val() });
        });
        setAcceptRequest(arr);
      },
    );
    return () => unsubscribe();
  }, []);

  // ============= Create blocked list ============= //
  const blockListHandle = (item) => {
    set(ref(database, "block_list/" + item.id), {
      ...item,
    })
      .then(() => {
        toast.success("Block Successfully");
      })
      .then(() => {
        remove(ref(database, "accept_request/" + item.id));
      });
  };

  // ============= Get blocked list ============= //
  useEffect(() => {
    const unsubscribe = onValue(ref(database, "block_list/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ id: item.key, ...item.val() });
      });
      setBlockList(arr);
    });
    return () => unsubscribe();
  }, []);

  // ============= Unfriend handle ============= //
  const unfriendHandle = async (item) => {
    try {
      await remove(ref(database, "block_list/" + item.id));
      toast.success("Successfully Unfriend");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex gap-2">
        <div className="w-8/12 h-full bg-primary/10 overflow-y-scroll ml-2">
          {/* // ============= Profile for message box ============= // */}
          <div className="w-full py-4 px-4 border-b-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-12">
                  <img className="w-full" src={assets.user_icon} alt="" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-gray-800">
                    Naruto Uzumaki
                  </h2>
                  <p className="text-xs font-medium text-gray-600">Online</p>
                </div>
              </div>
              <div>
                <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
              </div>
            </div>
          </div>

          {/* // ============= Chat box || messages box ============= // */}
          <div>
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

          {/* // ============= Messages input box ============= // */}
          <div>
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
              {/* // ============= Friends list ============= // */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Friends</h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* // ============= User profile ============= // */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {acceptRequest.map((item) => (
                  <UserProfle
                    onclick={() => blockListHandle(item)}
                    key={item.id}
                    btnText={"Block"}
                    userName={item?.senderName}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-6/12">
              {/* // ============= Blocks list ============= // */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20 mt-2">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">Blocks</h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* // ============= User profile ============= // */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {blockList.map((item) => (
                  <UserProfle
                    key={item.id}
                    onclick={() => unfriendHandle(item)}
                    btnText={"Unfriend"}
                    userName={item.senderName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Chat;
