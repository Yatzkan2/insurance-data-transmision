import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link
 from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-amber-100 to-amber-50">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center bg-gradient-to-b from-cyan-50 to-cyan-100 p-8 rounded min-h-[700px] md:min-h-[500px] md:min-w-[750px]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mt-10">Welcome to Polisave!</h2>
          <h3 className="text-gray-600 text-sm mt-10">
            Providing secure, reliable, and efficient management solutions for your insurance data, ensuring clarity and peace of mind at every step.
          </h3>

        </div>
        <div className="flex flex-row justify-center">
        
          <div className="m-2">
            <Link href="/producer" className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition-all duration-300 shadow-md rounded" type="submit">Leave your insurance Details!</Link>
          </div>
          <div className="m-2">
            <Link href="/history" className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition-all duration-300 shadow-md rounded" type="submit">Watch history</Link>
          </div>
          </div>
      </main>
    </div>
  );
}
