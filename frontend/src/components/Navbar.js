"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [userType, setUserType] = useState("student");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleForm = () => setIsLogin(!isLogin);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    alert("Logged out successfully");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login Successful!");
        setIsAuthenticated(true);
        setIsModalOpen(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullname, user_type: userType, subject: userType === "teacher" ? subject : "", password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Please log in.");
        setIsLogin(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <>
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

      <nav className="bg-white shadow-md px-8 py-2 flex justify-between items-center rounded-2xl">
        <ul className="flex space-x-6 text-sm font-semibold text-gray-900">
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100"><Link href="/">Home</Link></li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">About &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">In the News</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Workshops &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Training &#9662;</li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">Contact Us</li>
          {isAuthenticated && (
            <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
              <Link href="/dashboard">DashBoard</Link>
            </li>
          )}
        </ul>
        {isAuthenticated ? (
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={toggleModal}>
            Login / Signup
          </button>
        )}
      </nav>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-[450px] max-w-[90vw]">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={toggleModal}>
              ✖
            </button>
            {isLogin ? (
              <>
                <h2 className="text-2xl font-bold mb-5  text-black">Log in</h2>
                <input type="text" className="w-full px-4 py-2 border rounded-md mb-2 text-black" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="w-full px-4 py-2 border rounded-md mb-2 text-black" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handleLogin}>Log in</button>
                <p className="text-center mt-4 text-black">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>Sign up</span></p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-5 text-black">Sign up</h2>
                <input type="text" className="w-full px-4 py-2 border rounded-md mb-2 text-black" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                <input type="text" className="w-full px-4 py-2 border rounded-md mb-2 text-black" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="w-full px-4 py-2 border rounded-md mb-2 text-black" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <select className="w-full px-4 py-2 border rounded-md mb-2 text-black" value={userType} onChange={(e) => setUserType(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                {userType === "teacher" && (
                  <select className="w-full px-4 py-2 border rounded-md mb-2 text-black" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="">Select Subject</option>
                    <option value="physics">Computer</option>
                    <option value="chemistry">Chemistry</option>
                  </select>
                )}
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handleSignup}>Sign up</button>
                <p className="text-center mt-4 text-black">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>Log in</span></p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;