import TopicNavbar from "@/components/TopicNavbar";

const Theory = () => {
  return (
    
    <div className="p-6 bg-white">
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Objective</h2>
      <p className="text-gray-700 text-lg">Write a Python program to implement a queue using a list data structure.</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Theory</h2>
      <p className="text-gray-700 text-lg">
        A queue is a linear data structure that follows the <strong>First-In-First-Out (FIFO)</strong> principle.
        Elements are inserted from one end, called the <strong>rear</strong>, and removed from the <strong>front</strong>.
        This means the element added first will be removed first. Queues are commonly used in tasks such as job scheduling, 
        resource management, and algorithms like <strong>Breadth-First Search (BFS)</strong>. 
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mt-4">Queue Operations:</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg">
        <li><strong>Enqueue:</strong> Add an element to the rear of the queue.</li>
        <li><strong>Dequeue:</strong> Remove and return the front element.</li>
        <li><strong>Peek:</strong> Return the front element without removing it.</li>
        <li><strong>isEmpty:</strong> Check if the queue is empty.</li>
        <li><strong>Size:</strong> Get the number of elements in the queue.</li>
      </ul>

      <p className="text-gray-700 mt-4 text-lg">
        These operations allow efficient queue manipulation. Some implementations also include clearing the queue or checking if it's full.
      </p>

      <p className="text-gray-700 mt-4 text-lg">
        Python lists provide built-in methods such as <code className="bg-gray-200 px-1 rounded">append()</code> for enqueueing 
        and <code className="bg-gray-200 px-1 rounded">pop(0)</code> for dequeueing, making queue implementation straightforward.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Learning Outcomes</h2>
      <ul className="list-disc list-inside text-gray-700 text-lg">
        <li>Understand queue operations: enqueue, dequeue, and search.</li>
        <li>Implement a queue using a dynamic list.</li>
        <li>Gain experience with class structures, objects, and method calling.</li>
        <li>Learn how to use ‘if-elif’ conditions for decision-making.</li>
      </ul>
    </div>
  );
};

export default Theory;
