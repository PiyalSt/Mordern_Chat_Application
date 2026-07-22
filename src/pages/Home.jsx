import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { HiDotsVertical } from "react-icons/hi";
import UserProfle from "../components/UserProfle";
import { auth, database } from "../firebase/firebase.config";
import { onValue, ref } from "firebase/database";

const Home = () => {
  const [userData, setUserData] = useState([]);

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

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-8/12 h-full bg-primary/5 overflow-y-scroll">
          <div className="w-full min-h-screen border-l-2 border-r-2 border-primary/20">
            <div className="w-full flex flex-col gap-4 px-3">
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
              {/* top friend request accept */}
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
                  key={index}
                  btnText={"Add friend"}
                  userName={item.username}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-6/12">
              {/* bottom send friend request */}
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
                <UserProfle />
                <UserProfle />
                <UserProfle />
                <UserProfle />
                <UserProfle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
