import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { SiBunnydotnet, SiHomeadvisor } from "react-icons/si";
import { BsChatDotsFill } from "react-icons/bs";
import { auth, database } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router";

const Navbar = () => {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      onValue(ref(database, "users/" + currentUser.uid), (snapshot) => {
        const data = snapshot.val();
        setActiveUser(data);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="w-fit h-screen px-8 py-4 bg-primary/10 flex flex-col justify-between items-center">
        <div className="flex flex-col items-center">
          <div className="">
            {/* <img src={assets.chat_logo} alt="" /> */}
            <SiBunnydotnet className="text-5xl text-primary/90 cursor-pointer" />
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <Link to="/home">
              <div className="p-4 hover:bg-primary/60 rounded-full cursor-pointer transition-all duration-300 group">
                <SiHomeadvisor className="text-2xl text-gray-800 group-hover:text-white group-active:scale-90" />
              </div>
            </Link>
            <Link to="/chat">
              <div className="p-4 hover:bg-primary/60 rounded-full cursor-pointer transition-all duration-300 group">
                <BsChatDotsFill className="text-2xl text-gray-800 group-hover:text-white group-active:scale-90" />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-col">
          <div className="w-12 bg-white p-2 rounded-full cursor-pointer">
            <img src={assets.profile_icon} alt="" />
          </div>

          <p className="w-full text-center text-sm text-gray-900 capitalize font-medium">
            {activeUser?.userName}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
