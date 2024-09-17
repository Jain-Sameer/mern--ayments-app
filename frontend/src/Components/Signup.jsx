import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div
      className="w-1/3 h-auto border-solid border-gray-500 border-2 rounded-lg text-center mx-auto my-40 p-6
     bg-white"
    >
      <h1 className="text-5xl font-bold my-3">Sign Up</h1>
      <p className="my-5"> Enter your information to create your account</p>

      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">First Name</div>
          <input
            type="text"
            required
            className="border border-solid p-3 "
            placeholder="Enter First Name"
            onChange={(e) => {
              setfName(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">Last Name</div>
          <input
            type="text"
            required
            className="border border-solid p-3 "
            placeholder="Enter Last Name"
            onChange={(e) => {
              setlName(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">Email</div>
          <input
            type="email"
            required
            className="border border-solid p-3 "
            placeholder="abc@hhaha.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">Password</div>
          <input
            type="password"
            required
            className="border border-solid p-3 "
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <button
        onClick={async () => {
          const response = await fetch(
            "http://localhost:3000/api/v1/user/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                username: email,
                password,
              }),
            }
          );
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("token", token);
          navigate(`/dashboard`);
        }}
        className="bg-black w-full p-3 mt-8 text-white font-bold my-2 border-none rounded-lg"
      >
        Sign Up
      </button>
      <div>
        <p className="text-xl font-medium mt-8">
          Already have an account ?{" "}
          <a href="/signin" className="underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};
