import { TextField } from "@mui/material";
import React, { useState } from "react";
import CommonButtons from "../components/CommonButtons";

const Registration = () => {
  const [user, setUser] = useState('')
  const [userError, setUserError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registrationValidation = () => {
    if(!user) {
      console.log('Please enter name');
      setUserError(true)
    }

    console.log(user)
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
              type="email"
              label="Enter Email"
              variant="outlined"
            />
            <TextField
              type="password"
              label="Enter Password"
              variant="outlined"
            />
            <TextField
              type="password"
              label="Confirm Password"
              variant="outlined"
            />
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
