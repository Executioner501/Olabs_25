"use client";
import React from "react";
import { useRouter } from "next/navigation";

const topics = [
  { title: "Write a program to implement a Queue using a list data-structure", img: "/assets/computer/queue.png", path: "queue" },
  { title: "Write a program to implement a stack using a list data-structure", img: "/assets/computer/stack.png", path: "stack" },
  { title: "Write a program to plot the function y = x² using pyplot", img: "/assets/computer/plot.png", path: "plot" },
  { title: "Remove all lines containing 'a' from a file", img: "/assets/computer/remove-lines.png", path: "remove-lines" },
  { title: "Scalar Multiplication of a Point", img: "/assets/computer/scalar.png", path: "scalar" },
  { title: "Which Quadrant does the Point belong to", img: "/assets/computer/quadrant.png", path: "quadrant" },
  { title: "To Find the Origin of a Point using a Function in Java", img: "/assets/computer/origin.png", path: "origin" },
  { title: "Projection of a Point on X-axis and Y-axis", img: "/assets/computer/projection.png", path: "projection" },
  { title: "Implementing an Interface", img: "/assets/computer/interface.png", path: "interface" },
  { title: "Extending Interface to an Interface", img: "/assets/computer/extended-interface.png", path: "extended-interface" },
  { title: "Extend the functionality", img: "/assets/computer/extended-functionality.png", path: "extended-functionality" },
  { title: "Defining Constructors and Initializing Attributes using Default Constructor", img: "/assets/computer/constructors.png", path: "constructors" },
];

export default function ComputerScience() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-blue-500 hover:underline cursor-pointer">home</span> → 
        <span className="text-blue-500 hover:underline cursor-pointer"> computer science</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-orange-400 mb-2 drop-shadow-md">
        Computer Science
      </h1>
      <div className="w-24 h-1 bg-orange-500 rounded-full mb-6"></div>
      <h2 className="text-1xl font-semibold text-blue-700 mb-8">Class 12</h2>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="cursor-pointer bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => router.push(`/computer/${topic.path}`)}
          >
            <img src={topic.img} className="w-full h-36 object-cover bg-gray-100" alt={topic.title} />
            <div className="p-4 text-center text-gray-800 font-semibold text-sm leading-tight">
              {topic.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
