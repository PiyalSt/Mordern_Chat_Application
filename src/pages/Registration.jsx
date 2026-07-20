import { TextField } from "@mui/material";
import React from "react";
import CommonButtons from "../components/CommonButtons";

const Registration = () => {
  return (
    <>
      <div className="w-full h-screen bg-primary/10 flex items-center justify-center">
        <div className="w-140 bg-white shadow p-8 rounded-xl">
          <h2 className="text-center text-4xl font-bold">Registration</h2>

          <div className="flex flex-col gap-6 mt-12">
            <TextField
              type="text"
              label="Enter your name"
              variant="outlined"
            />
            <TextField
              type="email"
              label="Enter your email"
              variant="outlined"
            />
            <TextField
              type="password"
              label="Enter your password"
              variant="outlined"
            />
          </div>
          <div className="flex justify-center mt-8">
            <CommonButtons text={"Sign Up"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
