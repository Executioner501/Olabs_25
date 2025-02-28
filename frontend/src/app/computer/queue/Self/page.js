'use client';

import { useState } from 'react';
import TopicNavbar from "@/components/TopicNavbar";

const SelfEvaluation = () => {
  const questions = [
    // Queue Basics & Operations
    { id: 'q1', topic: 'Queue Basics & Operations', text: 'Which of the following operations is not typically supported by a queue data structure?', options: ['Enqueue', 'Dequeue', 'Random Access', 'Peek'], answer: 'Random Access' },
    { id: 'q2', topic: 'Queue Basics & Operations', text: 'What is a queue data structure?', options: ['LIFO principle', 'FIFO principle', 'Allows random access', 'Insertion and deletion in any order'], answer: 'FIFO principle' },
    { id: 'q3', topic: 'Queue Basics & Operations', text: 'Which operation adds an element to the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Enqueue' },
    { id: 'q4', topic: 'Queue Basics & Operations', text: 'Which operation removes an element from the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Dequeue' },
    { id: 'q11', topic: 'Queue Basics & Operations', text: 'Which operation is performed in O(1) time complexity in a queue?', options: ['Enqueue', 'Dequeue', 'Both', 'None'], answer: 'Both' },
  
    // Queue Implementation & Variants
    { id: 'q5', topic: 'Queue Implementation & Variants', text: 'Which of the following is not a common implementation of a queue?', options: ['Array', 'Linked List', 'Stack', 'None of these'], answer: 'Stack' },
    { id: 'q6', topic: 'Queue Implementation & Variants', text: 'What list method is typically used to remove elements from the front of a queue implemented using a list?', options: ['pop()', 'remove()', 'shift()', 'delete()'], answer: 'shift()' },
    { id: 'q12', topic: 'Queue Implementation & Variants', text: 'A circular queue prevents which problem of a simple queue?', options: ['Underflow', 'Overflow', 'Memory wastage', 'All of the above'], answer: 'Memory wastage' },
    { id: 'q13', topic: 'Queue Implementation & Variants', text: 'Which of the following queues allows insertion and deletion at both ends?', options: ['Priority Queue', 'Simple Queue', 'Deque', 'Circular Queue'], answer: 'Deque' },
    { id: 'q15', topic: 'Queue Implementation & Variants', text: 'How do you implement a queue using two stacks?', options: ['Push elements normally', 'Use one for enqueue, another for dequeue', 'Both push and pop on the same stack', 'It is impossible'], answer: 'Use one for enqueue, another for dequeue' },
  
    // Queue Pointers & Structure
    { id: 'q7', topic: 'Queue Pointers & Structure', text: 'What is the significance of the front pointer in a queue implementation?', options: ['Last element', 'Middle element', 'Random element', 'First element'], answer: 'First element' },
    { id: 'q8', topic: 'Queue Pointers & Structure', text: 'The location in the queue from which elements are removed is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Front' },
    { id: 'q9', topic: 'Queue Pointers & Structure', text: 'The location in the queue where elements are inserted is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Rear' },
  
    // Queue Applications & Errors
    { id: 'q10', topic: 'Queue Applications & Errors', text: 'Which data structure is required for Breadth First Traversal on a graph?', options: ['Stack', 'Queue', 'Tree', 'Heap'], answer: 'Queue' },
    { id: 'q14', topic: 'Queue Applications & Errors', text: 'What happens when you try to dequeue from an empty queue?', options: ['Returns null', 'Throws an error', 'Removes front element', 'Nothing happens'], answer: 'Throws an error' }
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
    let newScore = 0;

    for (const question of questions) {
      const selected = selectedAnswers[question.id];

      // If the question was not answered, set explanation to "Question not answered"
      if (!selected) {
        setExplanations(prev => ({ ...prev, [question.id]: 'Question not answered' }));
        continue; // Skip further processing for unanswered question
      }

      // If the answer is correct, increment the score and set explanation
      if (selected === question.answer) {
        newScore++;
        setExplanations(prev => ({ ...prev, [question.id]: 'Correct answer: ' + question.answer }));
      } else {
        setLoading(prev => ({ ...prev, [question.id]: true }));  // Start loading state

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
          setExplanations(prev => ({ ...prev, [question.id]: data.explanation || 'No explanation available.' }));
        } catch (error) {
          console.error('Error fetching explanation:', error);
          setExplanations(prev => ({ ...prev, [question.id]: 'Error retrieving explanation.' }));
        }

        setLoading(prev => ({ ...prev, [question.id]: false })); // End loading state
      }
    }

    setScore(newScore);
  };

  return (
    <div className="p-6 text-gray-900 bg-white min-h-screen">
      <TopicNavbar />
      <h2 className="text-2xl font-bold mb-4">Self-Evaluation</h2>
      <p className="mb-4">Step-by-step procedure to implement a queue using a list in Python.</p>
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
  <div className="mt-2">
    <strong>Explanation:</strong>
    <div className={`text-sm ${selectedAnswers[q.id] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
      {explanations[q.id].split(/\* /).map((point, index) => (
        point.trim() && (
          <p key={index} className="ml-4">
            • {point.trim()}
          </p>
        )
      ))}
    </div>
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
