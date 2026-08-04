import { TextField } from "@mui/material";
import React, { useState } from "react";
import CommonButtons from "../components/CommonButtons";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const loginValidation = () => {
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("login success");
        setInterval(() => {
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Invalid Email or Password");
      });
  };

  return (
    <div className="w-full h-screen bg-primary/10 flex items-center justify-center">
      <div className="w-140 bg-white shadow p-8 rounded-xl mx-6">
        <h2 className="text-center text-4xl font-bold">Welcome To Login</h2>

        <div className="flex flex-col gap-6 mt-12">
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

          {/* Toastify Container */}
          <ToastContainer position="top-right" />
        </div>
        <div className="flex justify-center mt-6">
          <CommonButtons onclick={loginValidation} text={"Login"} />
        </div>
        <p className="text-sm text-center capitalize mt-4">
          create a new account ?{" "}
          <Link to={"/registration"}>
            <span className="hover:underline hover:text-primary cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
