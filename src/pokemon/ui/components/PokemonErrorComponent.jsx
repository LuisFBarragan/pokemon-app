export const PokemonErrorComponent = ({ message, onRetry }) => (
  <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg border-4 border-yellow-400 flex flex-col items-center">
    <div className="flex items-center mb-4">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Pokeball"
        className="w-12 h-12 mr-4 animate-bounce"
      />
      <h2 className="text-2xl font-bold">¡Ups! Something was wrong</h2>
    </div>
    <p className="text-lg mb-4">{message || 'No pudimos capturar los datos.'}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-yellow-400 text-red-800 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
      >
        Retry
      </button>
    )}
  </div>
);