import { useState, useEffect } from 'react';
import { getPokemonListFromApi } from '../services/getPokemonListFromApi ';
import { localStorageService } from '@/core/utils/localStorageService';

const CACHE_EXPIRATION_TIME = 3600000;

export const usePokemonList = (limit, offset, handleUpdateState) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const cacheKey = `pokemon-list-${limit}-${offset}`;
        const cachedData = localStorageService.getItem(cacheKey);

        if (cachedData) {
          const cacheTimestamp = localStorageService.getItem(`${cacheKey}-timestamp`);
          if (Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME) {
            setPokemonList(cachedData.results);
            setLoading(false);
            return;
          }
        }

        const { results, count } = await getPokemonListFromApi(limit, offset);
        setPokemonList(results);
        setTotalPokemons(count)

        localStorageService.setItem(cacheKey, { results });
        localStorageService.setItem(`${cacheKey}-timestamp`, Date.now().toString());

      } catch (error) {
        setError('Failed to fetch Pokemon data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, offset]);
};
