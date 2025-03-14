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
import { fetchLocalPokemonDetail, fetchPokemonDetail , fetchSearchPokemon} from '@/pokemon/application/services/fetchPokemonDetail';
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
        setError('Failed to fetch Pokémon data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [ITEMS_PER_PAGE, currentPage]);

  const handleOpenPokemonDetail = async (pokemon) => {
    const pokemonDetail = pokemon.apiOrigin
      ? await fetchPokemonDetail(pokemon.url)
      : fetchLocalPokemonDetail(pokemon.name);

    setPokemonData(pokemonDetail);
    setShowModal(true);
  };

  const validatePokemonName = (name) => {
    if (name.trim() === '') {
      toast.error('The Pokemon name cannot be empty.');
      return false;
    }

    return true;
  };
  const handleAddPokemon = () => {
    if(!validatePokemonName(newPokemonName)) return;

    setLoading(true);
    const cacheKey = getCacheKey(ITEMS_PER_PAGE, currentPage);
    const cachedData = localStorageService.getItem(cacheKey);
    const newPokemon = new Pokemon(newPokemonName, '#', false);
    const updatedPokemonList = [...cachedData.results, newPokemon]
    setPokemonList(updatedPokemonList);
    localStorageService.setItem(cacheKey, {results: updatedPokemonList, count: cachedData.count});
    setLoading(false);
    toast.success(`New Pokemon "${newPokemonName}" added.`);
  };

  const handleSearchPokemon = async () => {
    if(!validateTextEmpty(filterPokemon)) return;

    setLoading(true);
    const pokemon = await fetchSearchPokemon(filterPokemon);
    if(pokemon !== null){
      setPokemonData(pokemon);
      setShowModal(true);
      setFilterPokemon('');
    }
    else{
      toast.error('Pokemon not found.');
    }
    setLoading(false);
  }

  return (
    <div className="p-4">


      {error && <PokemonErrorComponent message={error} />}
      {loading && <PokeballLoading />}

      <ToastContainer />

      {/* Modal for Pokémon detail */}
      <PokemonDetailModal isOpen={showModal} closeModal={() => setShowModal(false)} pokemon={pokemonData} />

      <TitleComponent>Pokemon List</TitleComponent>
      <div className="container mx-auto p-4 flex flex-col items-center">
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Pokemon"
            className="p-2 border rounded"
            onChange={(e) => setFilterPokemon(e.target.value)}
            value={filterPokemon}
          />
          <ButtonComponent onClick={handleSearchPokemon}>Search</ButtonComponent>
        </div>

        {/* Display Pokémon cards */}
        <div className="grid grid-cols-2 gap-5">
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

        {/* Add Pokemon */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add Pokémon"
            className="p-2 border rounded mr-2"
            onChange={(e) => setNewPokemonName(e.target.value)}
            value={newPokemonName}
          />
          <ButtonComponent onClick={handleAddPokemon}>Add Pokémon</ButtonComponent>
        </div>
      </div>
    </div>
  );
};