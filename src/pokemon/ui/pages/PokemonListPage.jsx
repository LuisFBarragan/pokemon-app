import React, { useEffect, useState } from 'react';
import { usePokemonList } from '@/pokemon/application/hooks/usePokemonList ';
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

  const CACHE_EXPIRATION_TIME = 3600000;
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
            setLoading(false);
            return;
          }
        }

        const { results, count } = await getPokemonListFromApi(ITEMS_PER_PAGE, currentPage);
        setPokemonList(results);
        setTotalPokemons(count)

        localStorageService.setItem(cacheKey, { results });
        localStorageService.setItem(`${cacheKey}-timestamp`, Date.now().toString());

      } catch (error) {
        setError('Failed to fetch Pokémon data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [ITEMS_PER_PAGE, currentPage]);



  const handleOpenPokemonDetail = (pokemon) => {
    setPokemonData(pokemon);
    setShowModal(true);
  };

  const handleAddPokemon = () => {
    if (newPokemonName.trim() === '') {
      toast.error('The Pokémon name cannot be empty.');
      return;
    }

    toast.success(`New Pokémon "${newPokemonName}" added.`);
  };

  return (
    <div className="p-4">

      {loading && <PokeballLoading />}

      {error && <PokemonErrorComponent message={error} />}

      <ToastContainer />

      {/* Modal for Pokémon detail */}
      <PokemonDetailModal isOpen={showModal} closeModal={() => setShowModal(false)} pokemon={pokemonData} />

      <TitleComponent>Pokemon List</TitleComponent>
      <div className="container mx-auto p-4 flex flex-col items-center">
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Pokémon"
            className="p-2 border rounded"
            onChange={(e) => setNewPokemonName(e.target.value)} // Update search query
            value={newPokemonName}
          />
        </div>

        {/* Display Pokémon cards */}
        <div className="grid grid-cols-2 gap-5">
          {pokemonList.map((pokemon, index) => (
            <CardComponent key={index} onClick={() => handleOpenPokemonDetail(pokemon)}>
              <p className="text-lg font-semibold text-gray-800">{pokemon.name}</p>
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