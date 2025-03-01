import Studentbar from "@/components/Studentbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Studentbar />
      <main className="flex-1 p-10 bg-gray-50">
        {children}
      </main>
    </div>
  );
}