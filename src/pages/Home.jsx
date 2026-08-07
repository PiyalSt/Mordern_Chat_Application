import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { HiDotsVertical } from "react-icons/hi";
import UserProfle from "../components/UserProfle";
import { auth, database } from "../firebase/firebase.config";
import { get, onValue, push, ref, remove, set } from "firebase/database";
import SearchBar from "../components/SearchBar";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [sendRequest, setSendRequest] = useState([]);
  const [sentRequestsData, setSentRequestsData] = useState([]);

  // ============= Get all users ============= //
  useEffect(() => {
    const userRef = ref(database, "users/");
    let arr = [];

    const unsubscribe = onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().userId != auth.currentUser?.uid) {
          arr.push({ id: item.key, ...item.val() });
          setAllUsers(arr);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  // ============= Send friend request ============= //
  const sendRequestHandle = async (item) => {
    const requestRef = ref(database, "friend_request_list");
    const snapshot = await get(ref(database, "users/" + auth.currentUser.uid));

    if (snapshot.exists()) {
      const currentUser = snapshot.val();
      await set(push(requestRef), {
        reciverId: item.id,
        reciverName: item.userName,
        senderId: currentUser.userId,
        senderName: currentUser.userName,
      });
      toast.success("Send friend request successfully");
    }
  };

  // ============= Get friend request list ============= //
  useEffect(() => {
    const requestRef = ref(database, "friend_request_list");

    const unsubscribe = onValue(requestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverId === auth.currentUser.uid) {
          arr.push({ id: item.key, ...item.val() });
          setSendRequest(arr);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  // ============= Accept friend request list ============= //
  const acceptRequestHandle = (item) => {
    set(ref(database, `accept_request/${item.id}`), {
      ...item,
    })
      .then(() => {
        toast.success("Accept Friend Request");
      })
      .then(() => {
        remove(ref(database, "friend_request_list/" + item.id));
      });
  };

  // ============= Get send request data list ============= //
  useEffect(() => {
    const requestRef = ref(database, "friend_request_list");
    const unsubscribe = onValue(requestRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {
        if (item.val().senderId === auth.currentUser.uid) {
          arr.push({
            id: item.key,
            ...item.val(),
          });
        }
      });
      setSentRequestsData(arr);
    });
    return () => unsubscribe();
  }, []);

  // ============= Cancel request handle ============= //
  const cancelRequestHandle = async (item) => {
    const request = sentRequestsData.find((req) => req.reciverId === item.id);

    if (request) {
      await remove(ref(database, "friend_request_list/" + request.id));
      toast.success("Request cancelled");
    }
  };

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
              {/* // ============= Send friend request list ============= // */}
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

              {/* // ============= User profile ============= // */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {allUsers.map((item, index) => {
                  const isRequested = sentRequestsData.some(
                    (request) => request.reciverId === item.id,
                  );

                  return (
                    <UserProfle
                      onclick={() =>
                        isRequested
                          ? cancelRequestHandle(item)
                          : sendRequestHandle(item)
                      }
                      key={index}
                      btnText={isRequested ? "Cancel Request" : "Add Friend"}
                      userName={item.userName}
                    />
                  );
                })}
              </div>
            </div>

            <div className="w-full h-6/12">
              {/* // ============= Accept friend request list ============= // */}
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

              {/* // ============= User profile ============= // */}
              <div className="w-full h-[80%] mt-4 flex flex-col gap-2 overflow-y-scroll">
                {sendRequest.map((item, index) => (
                  <UserProfle
                    key={index}
                    btnText={"Accept"}
                    onclick={() => acceptRequestHandle(item)}
                    userName={item.senderName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* // ============= Toast container ============= // */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
