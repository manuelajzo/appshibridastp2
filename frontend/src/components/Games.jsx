import { useEffect, useState } from 'react';
import { getGames } from '../../utils/api';

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGames()
      .then(data => {
        console.log('Games loaded:', data);
        setGames(data);
      })
      .catch(err => {
        setError('Failed to load games. Please try again later.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dlc-list">
      {games.map(game => (
        <div key={game._id} className="dlc-card">
          <img
            src={`http://localhost:3000${game.image}`}
            alt={game.name}
            className="dlc-image"
          />
          <h2>{game.name}</h2>
          <p><strong>Year:</strong> {game.year}</p>
          <p><strong>Platforms:</strong> {game.platforms?.join(', ')}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Games;
