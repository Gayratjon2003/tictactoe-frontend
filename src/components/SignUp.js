import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
// const BASE_URL = "http://localhost:5000/";
const BASE_URL = "https://tictactoe-x66r.onrender.com/";
function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [name, setName] = useState("");

  const signUp = () => {
    Axios.post(`${BASE_URL}signup`, { username: name }).then(
      (res) => {
        const { userId, token, username } = res.data;
        cookies.set("userId", userId);
        cookies.set("token", token);
        cookies.set("username", username);
        setIsAuth(true);
      }
    );
  };
  return (
    <div className="flex flex-col items-center text-2xl gap-y-4">
      <label htmlFor="signup" className="text-white"> Sign Up</label>
      <input
        id="signup"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-lg"
      />
      <button
        onClick={signUp}
        className="px-4 py-3 bg-red-600 w-36 rounded-lg mt-4 text-white text-base"
      >
        {" "}
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
