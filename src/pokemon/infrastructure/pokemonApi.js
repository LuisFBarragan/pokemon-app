import { CustomError } from "@/core/utils/CustomError";

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemon = async (limit, offset) => {
  const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new CustomError('Failed to fetch Pokémon list', response.status);
  }

  return response.json();
};

export const getPokemonDetailByUrl = async (url) => {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    throw new CustomError('Failed to get details', response.status);
  }

  return response.json();
};
