import { PokemonDetail } from '@/pokemon//domain/entities/PokemonDetail';
import { getPokemonByName, getPokemonDetailByUrl } from '@/pokemon/infrastructure/pokemonApi';
import { localStorageService } from '@/core/utils/localStorageService';
import { pokemonImages } from '@/pokemon/assets/imagesIndex';

const CACHE_EXPIRATION_TIME = 3600000;

export const fetchPokemonDetail = async (url) => {
  const cacheKey = `pokemon-detail-${url}`;
  const cacheTimestampKey = `${cacheKey}-timestamp`;
  const cachedData = localStorageService.getItem(cacheKey);
  const cachedTimestamp = localStorageService.getItem(cacheTimestampKey);

  if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_EXPIRATION_TIME) {
    return cachedData;
  }

  try {
    const data = await getPokemonDetailByUrl(url);

    const pokemonDetail = new PokemonDetail(
      data.id,
      data.name,
      data.sprites.front_default,
      data.types.map(type => type.type.name),
      data.stats.map(stat => ({
        name: stat.stat.name,
        baseStat: stat.base_stat,
      })),
      data.height
    );

    localStorageService.setItem(cacheKey, pokemonDetail);
    localStorageService.setItem(cacheTimestampKey, Date.now().toString());

    return pokemonDetail;

  } catch (error) {
    throw new Error(`Error fetching Pokemon details: ${error.message}`);
  }
};

export const fetchLocalPokemonDetail = (name) => {
  const unknownPokemon = {
    id: 0,
    name,
    sprite: pokemonImages.unknowPokemon,
    types: ["Type: ??"],
    stats: [
      { stat: {name: "hp"}, base_stat: 0 },
      { stat: {name: "attack"}, base_stat: 0 },
      { stat: {name: "defense"}, base_stat: 0 },
      { stat: {name: "special-attack"}, base_stat: 0 },
      { stat: {name: "special-defense"}, base_stat: 0 },
      { stat: {name: "speed"}, base_stat: 0 }
    ],
    height: 0
  };

  return new PokemonDetail(
    unknownPokemon.id,
    unknownPokemon.name,
    unknownPokemon.sprite,
    unknownPokemon.types.map(type => type),
    unknownPokemon.stats.map(stat => ({
      name: stat.stat.name,
      baseStat: stat.base_stat,
    })),
    unknownPokemon.height,
  );
};

export const fetchSearchPokemon = async (name) => {
  const cacheKey = `pokemon-search-pokemon-${name}`;
  const cacheTimestampKey = `${cacheKey}-timestamp`;

  const cachedData = localStorageService.getItem(cacheKey);
  const cachedTimestamp = localStorageService.getItem(cacheTimestampKey);

  if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_EXPIRATION_TIME) {
    return cachedData;
  }

  try {
    const data = await getPokemonByName(name);

    const pokemonDetail = new PokemonDetail(
      data.id,
      data.name,
      data.sprites.front_default,
      data.types.map(type => type.type.name),
      data.stats.map(stat => ({
        name: stat.stat.name,
        baseStat: stat.base_stat,
      })),
      data.height
    );

    localStorageService.setItem(cacheKey, pokemonDetail);
    localStorageService.setItem(cacheTimestampKey, Date.now().toString());

    return pokemonDetail;

  } catch (error) {
    return null;
  }
};