import React, { useEffect, useState } from 'react';
import { ButtonComponent } from '../components/ButtonComponent';
import { CardComponent } from '../components/CardComponent';
import { PokemonDetailModal } from '../components/PokemonDetailModalComponent';
import { TitleComponent } from '@/core/ui/components/TitleComponent';
import { PokeballLoading } from '../components/PokeballLoading';
import { PokemonErrorComponent } from '../components/PokemonErrorComponent';
import { PaginationComponent } from '../components/PaginationComponet';
import { ToastContainer, toast } from 'react-toastify';
import { localStorageService } from '@/core/utils/localStorageService';
import { getPokemonListFromApi } from '@/pokemon/application/services/getPokemonListFromApi ';
import 'react-toastify/dist/ReactToastify.css';
import { capitalizeFirstLetter } from '@/core/utils/capitalizeFirstLetter';
import { fetchLocalPokemonDetail, fetchPokemonDetail, fetchSearchPokemon } from '@/pokemon/application/services/fetchPokemonDetail';
import { Pokemon } from '@/pokemon/domain/entities/Pokemon';

const ITEMS_PER_PAGE = 10;

export const PokemonListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [newPokemonName, setNewPokemonName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPokemon, setFilterPokemon] = useState('');

  const CACHE_EXPIRATION_TIME = 3600000;

  const getCacheKey = (limit, offset) => `pokemon-list-${limit}-${offset}`;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const cacheKey = `pokemon-list-${ITEMS_PER_PAGE}-${currentPage}`;
        const cachedData = localStorageService.getItem(cacheKey);

        if (cachedData) {
          const cacheTimestamp = localStorageService.getItem(`${cacheKey}-timestamp`);
          if (Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME) {
            setPokemonList(cachedData.results);
            setTotalPokemons(cachedData.count);
            setLoading(false);
            return;
          }
        }

        const { results, count } = await getPokemonListFromApi(ITEMS_PER_PAGE, currentPage);
        setPokemonList(results);
        setTotalPokemons(count);

      } catch (error) {
        setError('Failed to fetch Pokemon data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [ITEMS_PER_PAGE, currentPage]);

  const handleOpenPokemonDetail = async (pokemon) => {
    setLoading(true);
    const pokemonDetail = pokemon.apiOrigin
      ? await fetchPokemonDetail(pokemon.url)
      : fetchLocalPokemonDetail(pokemon.name);

    setPokemonData(pokemonDetail);
    setShowModal(true);
    setLoading(false);
  };

  const validatePokemonName = (name) => {
    if (name.trim() === '') {
      toast.error('The Pokemon name cannot be empty.');
      return false;
    }

    return true;
  };
  const handleAddPokemon = () => {
    if (!validatePokemonName(newPokemonName)) return;

    setLoading(true);
    const cacheKey = getCacheKey(ITEMS_PER_PAGE, currentPage);
    const cachedData = localStorageService.getItem(cacheKey);
    const newPokemon = new Pokemon(newPokemonName, '#', false);
    const updatedPokemonList = [...cachedData.results, newPokemon]
    setPokemonList(updatedPokemonList);
    localStorageService.setItem(cacheKey, { results: updatedPokemonList, count: cachedData.count });
    setLoading(false);
    toast.success(`New Pokemon "${newPokemonName}" added.`);
  };

  const handleSearchPokemon = async () => {
    if (!validatePokemonName(filterPokemon)) return;

    setLoading(true);
    const pokemon = await fetchSearchPokemon(filterPokemon);
    if (pokemon !== null) {
      setPokemonData(pokemon);
      setShowModal(true);
      setFilterPokemon('');
    }
    else {
      toast.error('Pokemon not found.');
    }
    setLoading(false);
  }

  return (
    <div className="p-4 mt-[-5%]">
      {error && <PokemonErrorComponent message={error} />}
      {loading && <PokeballLoading />}

      <ToastContainer />

      <PokemonDetailModal isOpen={showModal} closeModal={() => setShowModal(false)} pokemon={pokemonData} />

      <TitleComponent>Pokemon List</TitleComponent>
      <div className="container">
        <div className='pb-4'>
          <div className="flex flex-wrap justify-between gap-4">
            {/* Search input field */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <div className='flex flex-row w-full sm:w-auto'>
                <input
                  type="text"
                  placeholder="Search Pokemon"
                  className="p-2 border rounded mr-2 w-full sm:w-auto"
                  onChange={(e) => setFilterPokemon(e.target.value)}
                  value={filterPokemon}
                />
                <ButtonComponent onClick={handleSearchPokemon}>Search</ButtonComponent>
              </div>
            </div>

            {/* Add Pokemon */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <div className='flex flex-row w-full sm:w-auto'>
                <input
                  type="text"
                  placeholder="Add Pokemon"
                  className="p-2 border rounded mr-2 w-full sm:w-auto"
                  onChange={(e) => setNewPokemonName(e.target.value)}
                  value={newPokemonName}
                />
                <ButtonComponent onClick={handleAddPokemon}>Add Pokemon</ButtonComponent>
              </div>
            </div>
          </div>
        </div>

        {/* Display Pokemon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pokemonList.map((pokemon, index) => (
            <CardComponent key={index} onClick={() => handleOpenPokemonDetail(pokemon)}>
              <p className="text-lg font-semibold text-gray-800">{capitalizeFirstLetter(pokemon.name)}</p>
            </CardComponent>
          ))}
        </div>

        {/* Pagination */}
        {totalPokemons > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(totalPokemons / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};