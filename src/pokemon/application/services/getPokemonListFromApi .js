import { getPokemon } from '@/pokemon/infrastructure/pokemonApi';
import { Pokemon } from '@/pokemon/domain/entities/Pokemon';
import { localStorageService } from '@/core/utils/localStorageService';

const CACHE_EXPIRATION_TIME = 3600000;
export const getPokemonListFromApi = async (limit, offset) => {
  const cacheKey = `pokemon-list-${limit}-${offset}`;
  const cacheTimestampKey = `${cacheKey}-timestamp`;

  const cachedData = localStorageService.getItem(cacheKey);
  const cachedTimestamp = localStorageService.getItem(cacheTimestampKey);

  if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_EXPIRATION_TIME) {
    const { results, count } = cachedData;
    return { results, count };
  }

  const data = await getPokemon(limit, offset);
  localStorageService.setItem(cacheKey, {
    results: data.results.map((p) => new Pokemon(p.name, p.url, true)),
    count: data.count,
  });
  localStorageService.setItem(cacheTimestampKey, Date.now().toString());

  return {
    results: data.results.map((p) => new Pokemon(p.name, p.url, true)),
    count: data.count,
  };
};
