import TopicNavbar from '@/components/TopicNavbar';
import Theory from './Theory/page'; // Default to Theory

const QueuePage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen shadow-md">
      <div className="bg-white p-6 rounded-lg">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="text-blue-500 hover:underline cursor-pointer">home</span> → 
          <span className="text-blue-500 hover:underline cursor-pointer"> computer science</span> → 
          <span className="text-blue-500 hover:underline cursor-pointer"> class 12</span> → 
          <span className="text-gray-600"> write a program to implement a queue using a list data-structure</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-orange-400 mt-4">
          Write a program to implement a Queue using a list data-structure
        </h1>

        {/* Inner Navbar for Topic Navigation */}
        <TopicNavbar topic="queue" />

        {/* Default to Theory Page */}
        <Theory />
      </div>
    </div>
  );
};

export default QueuePage;
