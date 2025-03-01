'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);

  const addClass = () => {
    const className = prompt("Enter class name:");
    if (className) {
      const newClass = {
        id: Date.now(),
        title: className,
      };
      setClasses([newClass, ...classes]);
    }
  };

  const deleteClass = (classId) => {
    setClasses(classes.filter((classItem) => classItem.id !== classId));
  };

  const navigateToStudents = (classItem) => {
    router.push(`/dashboard/students?classId=${classItem.id}&className=${encodeURIComponent(classItem.title)}`);
  };

  return (
    <div className="p-6 bg-[#1E3A8A] min-h-screen text-white">
      <h2 className="text-3xl font-bold">Classrooms</h2>
      <p className="text-gray-300 mb-6">Manage your students efficiently!</p>

      <div className="grid grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <ClassCard 
            key={classItem.id} 
            title={classItem.title} 
            onNavigate={() => navigateToStudents(classItem)}
            onDelete={() => deleteClass(classItem.id)}
          />
        ))}
        <AddClassCard onClick={addClass} />
      </div>
    </div>
  );
}

function ClassCard({ title, onNavigate, onDelete }) {
  return (
    <div 
      className="relative w-full bg-[#FACC15] shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={onNavigate}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
      <button 
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full" 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
      >
        ✕
      </button>
    </div>
  );
}

function AddClassCard({ onClick }) {
  return (
    <div
      className="flex items-center justify-center border-2 border-dashed border-white rounded-lg w-full h-40 cursor-pointer hover:bg-white hover:text-[#1E3A8A] transition"
      onClick={onClick}
    >
      <button className="border border-white px-4 py-2 rounded-lg">+ ADD CLASS</button>
    </div>
  );
}