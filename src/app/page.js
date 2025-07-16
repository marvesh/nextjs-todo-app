import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/to-do.jpg')" }}
    >
      <div className="bg-grey bg-opacity-90 p-10 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-grey-500 mb-4">Welcome to TaskEase!</h1>
        <p className="text-white-600 mb-6">Organize your day. Accomplish your goals.</p>
        
        {/* Register Button */}
        <Link
          href="/register"
          className="inline-block bg-gray-700 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded mb-2"
        >
          Get Started
        </Link>

        {/* Login Link */}
        <p className="mt-5 text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
