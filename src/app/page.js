"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("adminadmin!");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      email: email,
      password: password,
    };
    axios
      .post(
        "https://baby-tracker-baby-tracker.up.railway.app/api/v1/Auth/login",
        params,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const token = response.data.Token;
        // console.log(token);
        // console.log(response.data.user.role)
        const admin = response.data.user.role
        document.cookie = `Token=${token}; expires=Thu Apr 03 2028 11:08:05 GMT+0200; path=/`;
        document.cookie = `role=${admin}; expires=Thu Apr 03 2028 11:08:05 GMT+0200; path=/`;
        router.push("doctors");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="Submit" />
      </form>
    </>
  );
}
