"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        console.log("Login Response:", data);
        setIsModalOpen(false); // Close modal on success
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/assets/logo.jpg" alt="OLABS Logo" width={100} height={50} />
          <div className="ml-2">
            <p className="text-xs font-semibold">Funded by MeitY</p>
            <p className="text-xs">Ministry of Electronics & Information Technology</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src="/assets/amrita.png" alt="Amrita University" width={100} height={50} />
          <Image src="/assets/cdac.jpg" alt="CDAC Logo" width={100} height={50} />
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-8 py-2 flex justify-between items-center rounded-2xl overflow-hidden shadow-lg">
        <ul className="flex space-x-6 text-sm font-semibold text-gray-900">
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Home</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">About &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">In the News</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Workshops &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Training &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Contact Us</li>
          {/* Dashboard Link */}
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
            <Link href="/dashboard">DashBoard</Link>
          </li>
        </ul>

        {/* Login Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={toggleModal}>
          Login / Signup
        </button>
      </nav>

      {/* Login/Signup Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[100]">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-[450px] max-w-[90vw]">
            
            {/* Close Button */}
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={toggleModal}>
              ✖
            </button>

            {isLogin ? (
              <div className="login">
                <h2 className="text-2xl font-bold mb-5 text-black">Log in</h2>
                <div className="form-holder">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md mb-2 text-black"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md mb-2 text-black"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  onClick={handleLogin}
                >
                  Log in
                </button>
                <p className="text-gray-600 mt-4 text-center">Don't have an account?</p>
                <button className="text-blue-600 underline block w-full text-center" onClick={toggleForm}>
                  Sign up
                </button>
              </div>
            ) : (
              <div className="signup">
                <h2 className="text-2xl font-bold mb-4 text-black">Sign up</h2>
                {/* Signup Form Goes Here */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;