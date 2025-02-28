export default function DashboardPage() {
    return (
      <div>
        <h2 className="text-3xl font-bold">Classrooms</h2>
        <p className="text-gray-500 mb-6">Manage your students efficiently!</p>
  
        {/* Class Grid */}
        <div className="grid grid-cols-3 gap-6">
          <ClassCard image="https://source.unsplash.com/300x200/?portrait" title="Playlist 1" />
          <ClassCard image="https://source.unsplash.com/300x200/?black-and-white" title="Playlist 2" />
          <AddClassCard />
        </div>
      </div>
    );
  }
  
  // Class card component
  const ClassCard = ({ image, title }) => (
    <div className="relative w-full bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
      <p className="p-3 text-center text-gray-800">Class 1</p>
    </div>
  );
  
  // Add Class Card Component
  const AddClassCard = () => (
    <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg w-full h-40">
      <button className="border border-gray-400 px-4 py-2 rounded-lg">+ ADD CLASS</button>
    </div>
  );
  