'use client';

import { useState } from 'react';
import TopicNavbar from "@/components/TopicNavbar";
import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SelfEvaluation = () => {
  const questions = [
    { id: 'q1', topic: 'Queue Basics & Operations', text: 'Which of the following operations is not typically supported by a queue data structure?', options: ['Enqueue', 'Dequeue', 'Random Access', 'Peek'], answer: 'Random Access' },
    { id: 'q2', topic: 'Queue Basics & Operations', text: 'What is a queue data structure?', options: ['LIFO principle', 'FIFO principle', 'Allows random access', 'Insertion and deletion in any order'], answer: 'FIFO principle' },
    { id: 'q3', topic: 'Queue Basics & Operations', text: 'Which operation adds an element to the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Enqueue' },
    { id: 'q4', topic: 'Queue Basics & Operations', text: 'Which operation removes an element from the queue?', options: ['Pop', 'Push', 'Dequeue', 'Enqueue'], answer: 'Dequeue' },
    { id: 'q11', topic: 'Queue Basics & Operations', text: 'Which operation is performed in O(1) time complexity in a queue?', options: ['Enqueue', 'Dequeue', 'Both', 'None'], answer: 'Both' },
    { id: 'q5', topic: 'Queue Implementation & Variants', text: 'Which of the following is not a common implementation of a queue?', options: ['Array', 'Linked List', 'Stack', 'None of these'], answer: 'Stack' },
    { id: 'q6', topic: 'Queue Implementation & Variants', text: 'What list method is typically used to remove elements from the front of a queue implemented using a list?', options: ['pop()', 'remove()', 'shift()', 'delete()'], answer: 'shift()' },
    { id: 'q12', topic: 'Queue Implementation & Variants', text: 'A circular queue prevents which problem of a simple queue?', options: ['Underflow', 'Overflow', 'Memory wastage', 'All of the above'], answer: 'Memory wastage' },
    { id: 'q13', topic: 'Queue Implementation & Variants', text: 'Which of the following queues allows insertion and deletion at both ends?', options: ['Priority Queue', 'Simple Queue', 'Deque', 'Circular Queue'], answer: 'Deque' },
    { id: 'q15', topic: 'Queue Implementation & Variants', text: 'How do you implement a queue using two stacks?', options: ['Push elements normally', 'Use one for enqueue, another for dequeue', 'Both push and pop on the same stack', 'It is impossible'], answer: 'Use one for enqueue, another for dequeue' },
    { id: 'q7', topic: 'Queue Pointers & Structure', text: 'What is the significance of the front pointer in a queue implementation?', options: ['Last element', 'Middle element', 'Random element', 'First element'], answer: 'First element' },
    { id: 'q8', topic: 'Queue Pointers & Structure', text: 'The location in the queue from which elements are removed is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Front' },
    { id: 'q9', topic: 'Queue Pointers & Structure', text: 'The location in the queue where elements are inserted is _______.', options: ['Front', 'Back', 'Rear', 'Top'], answer: 'Rear' },
    { id: 'q10', topic: 'Queue Applications & Errors', text: 'Which data structure is required for Breadth First Traversal on a graph?', options: ['Stack', 'Queue', 'Tree', 'Heap'], answer: 'Queue' },
    { id: 'q14', topic: 'Queue Applications & Errors', text: 'What happens when you try to dequeue from an empty queue?', options: ['Returns null', 'Throws an error', 'Removes front element', 'Nothing happens'], answer: 'Throws an error' }
  ];
  const textQuestions = [
    { id: 'tq1', topic: 'Queue Basics & Operations', text: 'Explain the FIFO principle in your own words.' },
    { id: 'tq2', topic: 'Queue Applications & Errors', text: 'Describe a real-world application of queues.' },
    { id: 'tq3', topic: 'Queue Implementation & Variants', text: 'How does a circular queue differ from a simple queue?' },
    { id: 'tq4', topic: 'Queue Implementation & Variants', text: 'What are the advantages of using a linked list to implement a queue?' },
    { id: 'tq5', topic: 'Queue Pointers & Structure', text: 'Write a simple pseudocode to implement a queue using an array.' }
  ];
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [loading, setLoading] = useState({});
  const [topicPerformance, setTopicPerformance] = useState({});
  const [errors, setErrors] = useState({}); // Track unanswered questions
  const [weakTopics, setWeakTopics] = useState([]); // Track weak topics
  const [textFeedback, setTextFeedback] = useState({}); // Store feedback for text answers

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleTextChange = (questionId, text) => {
    setTextAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const evaluateTextAnswers = async () => {
    const textScores = {};
    const topicWiseTextCorrect = {};
    
    for (const question of textQuestions) {
      const answer = textAnswers[question.id];
      
      if (!answer || answer.trim() === '') {
        setTextFeedback(prev => ({ 
          ...prev, 
          [question.id]: {
            score: 0,
            feedback: "Question not answered",
            suggestions: ["Please provide an answer to receive feedback."]
          }
        }));
        continue;
      }
      
      setLoading(prev => ({ ...prev, [question.id]: true }));
      
      try {
        const response = await fetch('http://127.0.0.1:5001/evaluate_text_answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: question.id,
            questionText: question.text,
            studentAnswer: answer,
            topic: question.topic // Send topic information to the backend
          })
        });
        
        const data = await response.json();
        setTextFeedback(prev => ({ ...prev, [question.id]: data }));
        textScores[question.id] = data.score;
        
        // Track topic-wise performance for text questions
        if (data.score >= 3) { // Consider a score of 3 or higher as satisfactory
          topicWiseTextCorrect[question.topic] = (topicWiseTextCorrect[question.topic] || 0) + 1;
        }
      } catch (error) {
        console.error('Error evaluating text answer:', error);
        setTextFeedback(prev => ({ 
          ...prev, 
          [question.id]: {
            score: 0,
            feedback: "Error evaluating answer",
            suggestions: ["There was a problem evaluating your answer. Please try again later."]
          } 
        }));
      }
      
      setLoading(prev => ({ ...prev, [question.id]: false }));
    }
    
    return { textScores, topicWiseTextCorrect };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Evaluate MCQs
    let mcqScore = 0;
    const topicWiseCorrect = {};

    for (const question of questions) {
      const selected = selectedAnswers[question.id];

      // If the question was not answered, set explanation to "Question not answered"
      if (!selected) {
        setExplanations(prev => ({ ...prev, [question.id]: 'Question not answered' }));
        continue; // Skip further processing for unanswered question
      }

      // If the answer is correct, increment the score and set explanation
      if (selected === question.answer) {
        mcqScore++;
        setExplanations(prev => ({ ...prev, [question.id]: 'Correct answer: ' + question.answer }));

        // Track correct answers per topic
        topicWiseCorrect[question.topic] = (topicWiseCorrect[question.topic] || 0) + 1;
      } else {
        setLoading(prev => ({ ...prev, [question.id]: true }));  // Start loading state

        try {
          const response = await fetch('http://127.0.0.1:5001/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: question.text,
              wrongAnswer: selected,
              correctAnswer: question.answer,
              topic: question.topic // Send topic information to the backend
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
    
    // Evaluate text answers
    const { textScores, topicWiseTextCorrect } = await evaluateTextAnswers();
    
    // Calculate total text score
    const textTotalScore = Object.values(textScores).reduce((sum, score) => sum + score, 0);
    
    // Calculate final score (MCQ + text)
    const totalScore = mcqScore + textTotalScore;
    setScore(totalScore);
    
    // Calculate topic performance (combine MCQ and text questions)
    const totalQuestionsPerTopic = {};
    
    // Count MCQ questions per topic
    questions.forEach((q) => {
      totalQuestionsPerTopic[q.topic] = (totalQuestionsPerTopic[q.topic] || 0) + 1;
    });
    
    // Count text questions per topic
    textQuestions.forEach((q) => {
      totalQuestionsPerTopic[q.topic] = (totalQuestionsPerTopic[q.topic] || 0) + 1;
    });

    // Combine correct answers from both MCQ and text questions
    const combinedTopicCorrect = { ...topicWiseCorrect };
    
    // Add text question performance
    Object.keys(topicWiseTextCorrect).forEach(topic => {
      combinedTopicCorrect[topic] = (combinedTopicCorrect[topic] || 0) + topicWiseTextCorrect[topic];
    });
    
    const finalPerformance = Object.keys(totalQuestionsPerTopic).map((topic) => ({
      topic,
      percentage: ((combinedTopicCorrect[topic] || 0) / totalQuestionsPerTopic[topic]) * 100
    }));
    
    setTopicPerformance(finalPerformance);
    
    // Identify weak topics
    const weakTopicsList = finalPerformance
      .filter(topic => topic.percentage < 50)
      .map(topic => topic.topic);
    setWeakTopics(weakTopicsList);
    
    // Send report to backend
    const user = localStorage.getItem("username");
    const reportData = {
      username: user,
      title: "Write a program to implement a Queue using a list data-structure",
      totalMarks: `${totalScore} / ${questions.length + textQuestions.length * 5}`,
      weakAreas: weakTopicsList.join(', ')
    };
    
    // Automatically send report after evaluation
    fetch('http://127.0.0.1:5000/add_report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    }).catch(error => console.error("Error sending report:", error));
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
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{index + 1}. {q.text}</p>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {q.topic}
              </span>
            </div>
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
        <h2 className="text-xl font-semibold mt-8 mb-3">Short Answer Questions</h2>
        {textQuestions.map((tq, index) => (
          <div key={tq.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{questions.length + index + 1}. {tq.text}</p>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {tq.topic}
              </span>
            </div>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              value={textAnswers[tq.id] || ""}
              onChange={(e) => handleTextChange(tq.id, e.target.value)}
            />
            {/* Show text answer feedback if available */}
            {loading[tq.id] && <p className="mt-2 text-sm text-blue-600">Evaluating answer...</p>}
            {textFeedback[tq.id] && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <div className="flex items-center mb-2">
                  <strong className="mr-2">Score:</strong>
                  <span className={`font-bold ${textFeedback[tq.id].score >= 3 ? 'text-green-600' : 'text-orange-500'}`}>
                    {textFeedback[tq.id].score}/5
                  </span>
                </div>
                <div className="mb-2">
                  <strong>Feedback:</strong>
                  <p className="text-gray-700">{textFeedback[tq.id].feedback}</p>
                </div>
                {textFeedback[tq.id].suggestions && textFeedback[tq.id].suggestions.length > 0 && (
                  <div>
                    <strong>Suggestions:</strong>
                    <ul className="list-disc pl-5 text-gray-700">
                      {textFeedback[tq.id].suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
        <p className="mt-4 text-3xl font-semibold text-blue-500 shadow-md">
          Your Score: {score} / {questions.length + textQuestions.length * 5}
        </p>
      )}
      {/* Performance Chart */}
      {score !== null && topicPerformance.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Topic-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicPerformance}>
              <XAxis dataKey="topic" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percentage">
                {topicPerformance.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percentage < 50 ? 'red' : 'green'}  // Change color based on percentage
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* Weak Topics Identified */}
      {weakTopics.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Weak Topics Identified</h2>
          <ul className="list-disc pl-6">
            {weakTopics.map((topic, index) => (
              <li key={index} className="text-red-600">{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SelfEvaluation;