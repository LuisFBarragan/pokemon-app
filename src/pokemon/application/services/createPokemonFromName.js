import { Pokemon } from '@/pokemon/domain/entities/Pokemon';

export const createPokemonFromName = (name) => new Pokemon(name, '#', false);