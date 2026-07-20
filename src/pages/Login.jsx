import { TextField } from "@mui/material";
import React, { useState } from "react";
import CommonButtons from "../components/CommonButtons";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginValidation = () => {
    console.log(email);
    
  }

  return (
    <div className="w-full h-screen bg-primary/10 flex items-center justify-center">
      <div className="w-140 bg-white shadow p-8 rounded-xl mx-6">
        <h2 className="text-center text-4xl font-bold">Welcome To Login</h2>

        <div className="flex flex-col gap-6 mt-12">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Enter your email"
            variant="outlined" />
          <TextField
            type="password"
            label="Enter your password"
            variant="outlined"
          />
        </div>
        <div className="flex justify-center mt-10">
          <CommonButtons onclick={loginValidation} text={"Login"} />
        </div>
      </div>
    </div>
  );
};

export default Login;
