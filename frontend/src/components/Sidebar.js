"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, List } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname(); // Get current route

  return (
    <aside className="w-64 bg-white shadow-md p-6 h-screen">
      <h1 className="text-xl font-bold mb-6">Teacher Dashboard</h1>
      <nav className="space-y-4">
        <p className="text-gray-500 text-sm">Discover</p>
        <NavItem href="/dashboard" icon={<Home size={20} />} text="Home" active={pathname === "/dashboard"} />
        <NavItem href="/dashboard/students" icon={<Users size={20} />} text="Students data" active={pathname === "/dashboard/students"} />
        <NavItem href="/dashboard/tests" icon={<List size={20} />} text="Test History" active={pathname === "/dashboard/tests"} />
      </nav>
    </aside>
  );
};

// Sidebar navigation item component
const NavItem = ({ href, icon, text, active }) => (
  <Link href={href}>
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition ${active ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"}`}>
      {icon}
      <span className="text-lg">{text}</span>
    </div>
  </Link>
);

export default Sidebar;
