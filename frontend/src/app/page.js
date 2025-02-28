import React from "react";
import Link from "next/link";

const subjects = [
  { name: "PHYSICS", color: "bg-orange-500", img: "/assets/physics.png", link: "/physics" },
  { name: "CHEMISTRY", color: "bg-blue-600", img: "/assets/chemistry.png", link: "/chemistry" },
  { name: "BIOLOGY", color: "bg-green-600", img: "/assets/biology.png", link: "/biology" },
  { name: "MATHS", color: "bg-red-600", img: "/assets/maths.png", link: "/maths" },
  { name: "LANGUAGE", color: "bg-orange-500", img: "/assets/language.png", link: "/language" },
  { name: "SCIENCE", color: "bg-blue-600", img: "/assets/science.png", link: "/science" },
  { name: "SOCIAL SCIENCE", color: "bg-green-600", img: "/assets/socialscience.png", link: "/social-science" },
  { name: "COMPUTER", color: "bg-red-600", img: "/assets/computer.png", link: "/computer" }
];

export default function Home() {
  return (
    <div className="bg-gray-300 min-h-screen p-4">

      {/* Main Banner */}
      <section className="relative w-full h-80 bg-green-400 flex items-center justify-center rounded-xl overflow-hidden shadow-xl mb-6">
        <img src="/assets/banner.jpg" className="absolute w-full h-full object-cover rounded-xl" alt="Lab Learning" />
      </section>

      {/* Subject Cards */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {subjects.map((subject, index) => (
          <Link key={index} href="/computer">
            <div className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={subject.img} className="w-full h-24 object-contain bg-gray-100 rounded-t-xl" alt={subject.name} />
              <div className={`p-3 text-center text-white font-bold rounded-b-xl ${subject.color}`}>
                {subject.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
