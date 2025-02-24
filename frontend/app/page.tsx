import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-cyan-50">
      <main className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-amber-900">
            Welcome to PoliSave
          </h1>
          <p className="text-lg text-cyan-800">
            Your gateway to smart Insurance Policies!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/producer"
            className="transform transition-all duration-300 hover:scale-105 bg-amber-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-amber-600 flex items-center justify-center space-x-2"
          >
            <span className="text-lg font-semibold">Insurance details</span>
          </Link>
          
          <Link
            href="/history"
            className="transform transition-all duration-300 hover:scale-105 bg-cyan-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-cyan-600 flex items-center justify-center space-x-2"
          >
            <span className="text-lg font-semibold">Clients history</span>
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-center text-amber-700">
        <p className="text-sm">
          © {new Date().getFullYear()} PoliSave. All rights reserved.
        </p>
      </footer>
    </div>
  );
}