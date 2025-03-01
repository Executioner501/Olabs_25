'use client';
import { useSearchParams } from 'next/navigation';

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');

  return (
    <div className="p-6 bg-[#1E3A8A] min-h-screen text-white">
      <h2 className="text-3xl font-bold">Students for Class: {className}</h2>
      <p className="text-gray-300">View and manage students in this class.</p>

      {/* Render student list here (if needed, add future logic) */}
    </div>
  );
}