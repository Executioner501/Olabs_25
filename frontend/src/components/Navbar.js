import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            Home
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            About &#9662;
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            In the News
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            Workshops &#9662;
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            Training &#9662;
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            Download
          </li>
          <li className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition">
            Contact Us
          </li>
        </ul>
        <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-100 transition text-gray-900">
          <span className="font-semibold">Languages</span>
          <span>🏳</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
