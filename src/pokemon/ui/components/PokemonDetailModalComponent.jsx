import React, { useState,  useCallback } from 'react';
import { capitalizeFirstLetter } from "@/core/utils/capitalizeFirstLetter";
import { pokemonImages } from "@/pokemon/assets/imagesIndex";
import { bgColorByTypesConst } from '@/pokemon/domain/constants/bgColorByTypesConst';

export const PokemonDetailModal = ({ isOpen, closeModal, pokemon }) => {
  if (!isOpen) return null;
  const [imageSrc, setImageSrc] = useState(pokemon.sprite);

  const handleError = useCallback(() => {
    setImageSrc(pokemonImages.unknowPokemon);
  }, [pokemonImages.unknowPokemon]);


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-red-500 border-8 border-yellow-400 p-4 rounded-2xl max-w-md max-h-[80vh] overflow-y-auto relative no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-xs text-white bg-gray-800 p-2 rounded-full"
          onClick={closeModal}
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
            <img
              src={imageSrc}
              alt={`Image of ${pokemon.name} Pokemon`}
              className="w-full h-full object-contain"
              onError={handleError}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold capitalize text-white">{pokemon.name}</h2>

          <div className="flex space-x-2 mt-4 flex-wrap justify-center">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`${bgColorByTypesConst[type]} text-white px-4 py-2 rounded-full text-xs sm:text-sm`}
              >
                {capitalizeFirstLetter(type)}
              </span>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-red-500">Stats</h3>
            <div className="space-y-2 mt-2">
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span className="capitalize font-medium">
                    {stat.name && stat.name.replace('-', ' ')}
                  </span>
                  <span className="bg-red-300 text-red-800 px-2 py-1 rounded-lg">
                    {stat.baseStat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-yellow-100 p-2 rounded-lg shadow-md w-full flex justify-between">
            <span className="font-semibold text-red-600">Height:</span>
            <span className="text-black font-medium ml-1.5 ">{pokemon.height} dm</span>
          </div>
        </div>
      </div>
    </div>
  );
};