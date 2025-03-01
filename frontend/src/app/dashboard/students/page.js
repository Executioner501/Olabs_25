'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');

  const [students, setStudents] = useState([]);

  const addStudent = async () => {
    const username = prompt('Enter student username:');
    if (!username) return;

    try {
      const response = await fetch(`http://localhost:5000/get-student?username=${username}`);
      const data = await response.json();

      if (response.ok) {
        setStudents((prev) => {
          const alreadyAdded = prev.some(student => student.username === data.username);
          if (alreadyAdded) {
            alert('Student already added to this class!');
            return prev;
          }
          return [...prev, data];
        });
      } else {
        alert(data.error || 'Student not enrolled');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      alert('Failed to fetch student data');
    }
  };

  return (
    <div className="p-6 bg-[#1E3A8A] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-2">Students for Class: {className}</h2>
      <p className="text-gray-300 mb-4">View and manage students in this class.</p>

      <button
        onClick={addStudent}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        + Add Student
      </button>

      {students.length === 0 ? (
        <p className="text-gray-300">No students added yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white text-black rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Marks Obtained</th>
                <th className="py-2 px-4">Total Marks</th>
                <th className="py-2 px-4">Weak Areas</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.username} className="border-b">
                  <td className="py-2 px-4">{student.username}</td>
                  <td className="py-2 px-4">{student.fullname || student.username}</td>
                  <td className="py-2 px-4">{student.total_obtained}</td>
                  <td className="py-2 px-4">{student.total_max}</td>
                  <td className="py-2 px-4">
                    {student.weakAreas && student.weakAreas.length > 0 
                      ? student.weakAreas.join(', ') 
                      : 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}