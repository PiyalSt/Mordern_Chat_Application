import { TextField } from "@mui/material";
import React, { useState } from "react";
import CommonButtons from "../components/CommonButtons";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../firebase/firebase.config";
import { ref, set } from "firebase/database";

const Registration = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);``

  const registrationValidation = () => {
    if (!userName) {
      toast.error("Please Enter Name");
      setUserError(true);
      return;
    }
    if (!email) {
      toast.error("Please Enter Email");
      setEmailError(true);
      return;
    }
    if (!password) {
      toast.error("Please Enter Password");
      setPasswordError(true);
      return;
    }
    if (!confirmPassword) {
      toast.error("Please Enter Confirm Password");
      setConfirmPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password Don't Match");
      setConfirmPasswordError(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user        

        set(ref(database, "users/" + userCredential.user.uid), {
          userId: user.uid,
          userName: userName,
          email: email,
        });

        toast.success("Registration Successfully");
        
        setInterval(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("This email is already linked.");
      });
  };

  return (
    <>
      <div className="w-full h-screen bg-primary/10 flex items-center justify-center">
        <div className="w-140 bg-white shadow p-8 rounded-xl mx-6">
          <h2 className="text-center text-4xl font-bold">Registration</h2>

          <div className="flex flex-col gap-6 mt-12">
            <TextField
              onChange={(e) => {
                setUserName(e.target.value);
                setUserError(false);
              }}
              type="text"
              label="Enter Name"
              variant="outlined"
              error={userError}
            />
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              type="email"
              label="Enter Email"
              variant="outlined"
              error={emailError}
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              type="password"
              label="Enter Password"
              variant="outlined"
              error={passwordError}
            />
            <TextField
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(false);
              }}
              type="password"
              label="Confirm Password"
              variant="outlined"
              error={confirmPasswordError}
            />

            {/* Toastify Container */}
            <ToastContainer position="top-right" />
          </div>
          <div className="flex justify-center mt-6">
            <CommonButtons onclick={registrationValidation} text={"Sign Up"} />
          </div>
          <p className="text-sm text-center capitalize mt-4">
            already have an account ?{" "}
            <Link to={"/"}>
              <span className="hover:underline hover:text-primary cursor-pointer">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
