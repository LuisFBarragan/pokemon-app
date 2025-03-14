import React from "react";

export const MainLayoutComponent = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-red-500 to-red-500 p-6">
      <div className="w-full h-full max-w-4xl max-h-3xl flex flex-col items-center justify-center bg-yellow-500 border-8 border-yellow-500 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg border-4 border-yellow-500 shadow-2xl">
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
