'use client'; // Ensure this runs only on the client side

import Link from 'next/link';
import { FaBook, FaRedo, FaVideo, FaProjectDiagram, FaQuestionCircle, FaBookOpen, FaComments } from 'react-icons/fa';

const TopicNavbar = ({ topic }) => {
  const tabs = [
    { name: 'Theory', icon: FaBook, path: `/computer/queue/` },
    { name: 'Procedure', icon: FaRedo, path: `/computer/${topic}/procedure` },
    { name: 'Video', icon: FaVideo, path: `/computer/${topic}/video` },
    { name: 'Simulator', icon: FaProjectDiagram, path: `/computer/${topic}/simulator` },
    { name: 'Self Evaluation', icon: FaQuestionCircle, path: `/computer/${topic}/Self/` },
    { name: 'Reference', icon: FaBookOpen, path: `/computer/${topic}/reference` },
    { name: 'Feedback', icon: FaComments, path: `/computer/${topic}/feedback` }
  ];

  return (
    <nav className="flex justify-center space-x-4 bg-gray-100 p-4 shadow-md">
      {tabs.map(({ name, icon: Icon, path }) => (
        <Link key={path} href={path} className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-200">
          <Icon size={18} />
          <span className="font-semibold">{name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default TopicNavbar;
