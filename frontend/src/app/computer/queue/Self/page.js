'use client';

import { useState } from 'react';
import TopicNavbar from "@/components/TopicNavbar";

const SelfEvaluation = () => {
  const questions = [
    { id: 'q1', text: 'Which of the following operations is not typically supported by a queue data structure?', options: ['Enqueue', 'Dequeue', 'Random Access', 'Peek'], answer: 'Random Access' },
    { id: 'q2', text: 'What is a queue data structure?', options: ['LIFO principle', 'FIFO principle', 'Allows random access', 'Insertion and deletion in any order'], answer: 'FIFO principle' },
    { id: 'q3', text: 'Which operation adds an element to the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Enqueue' },
    { id: 'q4', text: 'Which operation removes an element from the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Dequeue' },
    { id: 'q5', text: 'Which of the following is not a common implementation of a queue?', options: ['Array', 'Linked List', 'Stack', 'None of these'], answer: 'Stack' },
    { id: 'q6', text: 'What list method is typically used to remove elements from the front of a queue implemented using a list?', options: ['pop()', 'remove()', 'shift()', 'delete()'], answer: 'shift()' },
    { id: 'q7', text: 'What is the significance of the front pointer in a queue implementation?', options: ['Last element', 'Middle element', 'Random element', 'First element'], answer: 'First element' },
    { id: 'q8', text: 'The location in the queue from which elements are removed is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Front' },
    { id: 'q9', text: 'The location in the queue where elements are inserted is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Rear' },
    { id: 'q10', text: 'Which data structure is required for Breadth First Traversal on a graph?', options: ['Stack', 'Queue', 'Tree', 'Heap'], answer: 'Queue' },
    { id: 'q11', text: 'Which operation is performed in O(1) time complexity in a queue?', options: ['Enqueue', 'Dequeue', 'Both', 'None'], answer: 'Both' },
    { id: 'q12', text: 'A circular queue prevents which problem of a simple queue?', options: ['Underflow', 'Overflow', 'Memory wastage', 'All of the above'], answer: 'Memory wastage' },
    { id: 'q13', text: 'Which of the following queues allows insertion and deletion at both ends?', options: ['Priority Queue', 'Simple Queue', 'Deque', 'Circular Queue'], answer: 'Deque' },
    { id: 'q14', text: 'What happens when you try to dequeue from an empty queue?', options: ['Returns null', 'Throws an error', 'Removes front element', 'Nothing happens'], answer: 'Throws an error' },
    { id: 'q15', text: 'How do you implement a queue using two stacks?', options: ['Push elements normally', 'Use one for enqueue, another for dequeue', 'Both push and pop on the same stack', 'It is impossible'], answer: 'Use one for enqueue, another for dequeue' }
  ];
  

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [loading, setLoading] = useState({});

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const [errors, setErrors] = useState({}); // Track unanswered questions

const handleSubmit = async (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  let newScore = 0;
  let newExplanations = {};
  let newErrors = {}; // Store "Not answered" messages

  for (const question of questions) {
    const selected = selectedAnswers[question.id];

    if (!selected) {
      // ❌ User didn't answer -> Show "Not answered"
      newErrors[question.id] = 'Not answered';
      newExplanations[question.id] = 'Not answered';
    } else if (selected === question.answer) {
      newScore++;
    } else {
      setLoading(prev => ({ ...prev, [question.id]: true }));

      try {
        const response = await fetch('http://127.0.0.1:5000/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question.text,
            wrongAnswer: selected,
            correctAnswer: question.answer
          })
        });

        const data = await response.json();
        const formattedExplanation = `* ` + data.explanation.replace(/\n/g, '\n* ');

        newExplanations[question.id] = formattedExplanation;
      } catch (error) {
        console.error('Error fetching explanation:', error);
        newExplanations[question.id] = 'Error retrieving explanation.';
      }

      setLoading(prev => ({ ...prev, [question.id]: false }));
    }
  }

  setScore(newScore);
  setExplanations(newExplanations);
  setErrors(newErrors); // Update "Not answered" messages
};

  

  return (
    <div className="p-6 text-gray-900 bg-white min-h-screen">
      <TopicNavbar />
      <h2 className="text-2xl font-bold mb-4">Self-Evaluation</h2>
      <h2 className="text-xl font-semibold mb-3">Queue Data Structure MCQ Test</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="font-medium mb-2">{index + 1}. {q.text}</p>
            {q.options.map((option, i) => (
              <label key={i} className="block text-gray-800">
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={selectedAnswers[q.id] === option}
                  onChange={() => handleOptionChange(q.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}

            {/* Show explanation or loading indicator */}
            {loading[q.id] && <p className="mt-2 text-sm text-blue-600">Fetching explanation...</p>}
            {explanations[q.id] && (
              <div className="mt-2 text-sm text-red-600">
                <strong>Explanation:</strong>
                {explanations[q.id].split(/\* /).map((point, index) => (
                  point.trim() && <p key={index} className="ml-4">• {point.trim()}</p>
                ))}
              </div>
            )}
          </div>
        ))}

        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Submit
        </button>
      </form>

      {score !== null && (
        <p className="mt-4 text-lg font-semibold">Your Score: {score} / {questions.length}</p>
      )}
    </div>
  );
};

export default SelfEvaluation;