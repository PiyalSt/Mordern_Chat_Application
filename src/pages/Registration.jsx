import { TextField } from "@mui/material";
import React, { useState } from "react";
import CommonButtons from "../components/CommonButtons";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const [user, setUser] = useState('')
  const [userError, setUserError] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const registrationValidation = () => {
    if(!user) {
      toast.error('Please Enter Name')
      setUserError(true)
      return;
    }
    if(!email) {
      toast.error('Please Enter Email')
      setEmailError(true)
      return;
    }
    if(!password) {
      toast.error('Please Enter Password')
      setPasswordError(true)
      return;
    }
    if(!confirmPassword) {
      toast.error('Please Enter Confirm Password')
      setConfirmPasswordError(true)
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password Don't Match")
      setConfirmPasswordError(true)
      return;
    }
    
    toast.success('Registration Successfully')

  }

  return (
    <>
      <div className="w-full h-screen bg-primary/10 flex items-center justify-center">
        <div className="w-140 bg-white shadow p-8 rounded-xl mx-6">
          <h2 className="text-center text-4xl font-bold">Registration</h2>

          <div className="flex flex-col gap-6 mt-12">
            <TextField
              onChange={(e)=> {
                setUser(e.target.value)
                setUserError(false)
              }}
              type="text"
              label="Enter Name"
              variant="outlined"
              error={userError}
            />
            <TextField
              onChange={(e)=> {
                setEmail(e.target.value)
                setEmailError(false)
              }}
              type="email"
              label="Enter Email"
              variant="outlined"
              error={emailError}
            />
            <TextField
              onChange={(e)=> {
                setPassword(e.target.value)
                setPasswordError(false)
              }}
              type="password"
              label="Enter Password"
              variant="outlined"
              error={passwordError}
            />
            <TextField
              onChange={(e)=> {
                setConfirmPassword(e.target.value)
                setConfirmPasswordError(false)
              }}
              type="password"
              label="Confirm Password"
              variant="outlined"
              error={confirmPasswordError}
            />

            {/* Toastify Container */}
            <ToastContainer position="top-right" />
          </div>
          <div className="flex justify-center mt-10">
            <CommonButtons onclick={registrationValidation} text={"Sign Up"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
