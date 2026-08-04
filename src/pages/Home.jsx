import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { HiDotsVertical } from "react-icons/hi";
import UserProfle from "../components/UserProfle";
import { auth, database } from "../firebase/firebase.config";
import { get, onValue, push, ref, set } from "firebase/database";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const userRef = ref(database, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      const users = Object.entries(data || {})
        .map(([id, user]) => ({
          id,
          ...user,
        }))
        .filter((user) => user.id !== auth.currentUser.uid);
      setUserData(users);
    });
  }, []);

  const sendRequestHandle = async (item) => {
    const requestRef = ref(database, "friendrequestlists");

    const snapshot = await get(
      ref(database, "users/" + auth.currentUser.uid)
    );

    if (snapshot.exists()) {
      const currentUser = snapshot.val();

      await set(push(requestRef), {
        reciverId: item.id,
        reciverName: item.userName,

        senderId: currentUser.userId,
        senderName: currentUser.userName,
      });
    }
  };

  // get data friend request list
  useEffect(() => {
  const requestRef = ref(database, "friendrequestlists");

  onValue(requestRef, (snapshot) => {
    const data = snapshot.val();

    const requests = Object.entries(data || {}).map(([id, request]) => ({
      id, // push key
      ...request,
    }))
    .filter((request) => request.reciverId === auth.currentUser.uid);

    setRequestData(requests);
  });
    }, []);

  // accept frirend request
  const acceptRequestHandle = () => {
    
  }

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-8/12 h-full bg-primary/5 overflow-y-scroll">
          <div className="w-full min-h-screen border-l-2 border-r-2 border-primary/20 px-4">
            <div className="w-full my-4">
              <SearchBar />
            </div>
            <div className="w-full flex flex-col gap-4">
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </div>
        </div>
        <div className="w-4/12 h-full bg-primary/10">
          <div className="w-full h-screen px-4 py-4">
            <div className="w-full h-6/12">

              {/* Send Friend Request */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Send Request
                  </h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* user proflie list */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {userData.map((item, index) => (
                  <UserProfle
                    onclick={() => sendRequestHandle(item)}
                    key={index}
                    btnText={"Add friend"}
                    userName={item.userName}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-6/12">
              {/* Accept Friend Request */}
              <div className="flex justify-between items-center pb-4 border-b-2 border-primary/20 mt-2">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Accept Request
                  </h2>
                </div>
                <div className="">
                  <HiDotsVertical className="text-xl text-gray-800 cursor-pointer active:scale-90" />
                </div>
              </div>

              {/* user proflie list */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">

                {requestData.map((item, index) => (
                  <UserProfle
                    key={index}
                    btnText={"Accept"}
                    userName={item.senderName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
