import React from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        // console.log("token", token);
        setToken(token);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
      } else {
        // toast.error("something went wrong");
        // console.log("reached here");
        toast.error(error?.response?.data?.message || "soemthing went wrong");
      }
    } catch (error) {
      // console.log("reached here");
      console.log(error);
      // toast.error("something went wrong");
      toast.error(error?.response?.data?.message || "soemthing went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 roudned-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="font-light text-gray-400">
              For testing email : arjun@gmail.com{" "}
            </p>
            <p className="font-light text-gray-400 mb-2">
              password : ADMINPASSWORD
            </p>
            <p className="font-light">Enter your email and password</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label> Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                required
                placeholder="Your eamil id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label> Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary transition-all text-white rounded cursor-pointer hover:bg-primary/90"
            >
              {" "}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
