"use client";

import { redirect } from "next/navigation";

export default function UnauthorizedClient({ role }: { role?: string }) {
    
  const handleRedirect = () => {
    if (role?.toUpperCase() === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-semibold text-red-600 mb-4">
          🚫 Access Denied
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleRedirect}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
