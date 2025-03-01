'use client';
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentData = async () => {
    setLoading(true);
    setError(null);
    
    // Get username from localStorage instead of prompting
    const username = localStorage.getItem('username');
    
    if (!username) {
      setError('No username found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get-student?username=${username}`);
      const data = await response.json();

      if (response.ok) {
        setStudents([data]); // Replace with new data instead of appending
      } else {
        setError(data.error || 'Student not found or no reports available');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      setError('Failed to fetch student data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load student data when component mounts
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetchStudentData();
    }
  }, []);

  return (
    <div className="p-6 bg-[#1E3A8A] min-h-screen text-white">
      <h2 className="text-3xl font-bold">Test History</h2>
      <p className="text-gray-300 mb-6">View your Test Scores.</p>

      <button
        onClick={fetchStudentData}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh Data'}
      </button>

      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}

      {students.length === 0 ? (
        <p className="text-gray-300">No data available. Click "Refresh Data" to fetch your scores.</p>
      ) : (
        <>
          {/* Student Summary */}
          <div className="mb-6 bg-white text-black rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-2">Student Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Name</p>
                <p className="font-bold text-lg">{students[0].fullname}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Total Score</p>
                <p className="font-bold text-lg">{students[0].total_obtained} / {students[0].total_max}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Percentage</p>
                <p className="font-bold text-lg">
                  {students[0].total_max > 0 
                    ? ((students[0].total_obtained / students[0].total_max) * 100).toFixed(1) + '%' 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Weak Areas */}
          <div className="mb-6 bg-white text-black rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-2">Areas Needing Improvement</h3>
            {students[0].weakAreas && students[0].weakAreas.length > 0 ? (
              <ul className="list-disc pl-5">
                {students[0].weakAreas.map((area, index) => (
                  <li key={index} className="mb-1">{area}</li>
                ))}
              </ul>
            ) : (
              <p>No weak areas identified.</p>
            )}
          </div>
          
          {/* Individual Test Reports */}
          <div className="bg-white text-black rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Individual Test Reports</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Test Title</th>
                    <th className="py-2 px-4">Score</th>
                    <th className="py-2 px-4">Weak Areas</th>
                  </tr>
                </thead>
                <tbody>
                  {students[0].reports && students[0].reports.map((report) => (
                    <tr key={report._id} className="border-b">
                      <td className="py-2 px-4">{report.title}</td>
                      <td className="py-2 px-4">{report.total_score}</td>
                      <td className="py-2 px-4">
                        {Array.isArray(report.weakAreas) 
                          ? report.weakAreas.join(', ') 
                          : report.weakAreas || 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}