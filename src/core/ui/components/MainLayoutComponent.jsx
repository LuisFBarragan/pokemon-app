import React from "react";

export const MainLayoutComponent = ({ children }) => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-gradient-to-br from-red-500 via-red-500 to-red-500 overflow-hidden">
      <div className="w-full max-w-4xl h-full flex flex-col bg-yellow-500 border-8 border-yellow-500 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg border-4 border-yellow-500 shadow-2xl overflow-auto">
          <div className="w-full h-full flex items-center justify-center font-bold scale-85">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};