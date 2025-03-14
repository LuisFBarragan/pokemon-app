import React from "react";

export const CardComponent = ({ children, onClick }) => (
  <div
    className="border p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-yellow-500 sm:w-55 md:w-72 h-15 hover:scale-105 hover:bg-blue-300"
    onClick={onClick}
  >
    <div className="flex flex-col items-center justify-center text-center h-full">
      {children}
    </div>
  </div>
);
