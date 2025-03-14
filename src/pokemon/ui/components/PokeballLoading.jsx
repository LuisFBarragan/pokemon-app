import React from 'react';

export const PokeballLoading = () =>  (
  <div className="flex justify-center items-center h-screen translate-y-[-25%]">
    <div className="relative w-24 h-24 animate-spin">
      {/* Pokéball */}
      <div className="absolute w-full h-full rounded-full bg-red-600 shadow-lg">
        {/* Top part of the Pokéball */}
        <div className="absolute top-0 w-full h-1/2 bg-red-600 rounded-t-full shadow-md"></div>
        {/* Bottom part of the Pokéball */}
        <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full shadow-md"></div>
      </div>
      {/* Pokéball center button (black and with more depth) */}
      <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-xl">
        {/* Pokéball center (smaller, in white) */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
      </div>
    </div>
  </div>
);