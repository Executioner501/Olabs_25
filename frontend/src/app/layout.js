import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-300 flex justify-center min-h-screen">
        <div className="bg-white w-[1200px] shadow-lg">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}