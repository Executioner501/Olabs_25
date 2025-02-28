import { useParams } from "next/navigation";

export default function TopicPage() {
  const { slug } = useParams();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-extrabold text-orange-400 mb-2 drop-shadow-md capitalize">
        {slug.replace("-", " ")}
      </h1>
      <div className="w-24 h-1 bg-orange-500 rounded-full mb-6"></div>
      <p className="text-gray-700 text-lg">
        Here, you will learn about {slug.replace("-", " ")} in detail.
      </p>
    </div>
  );
}
