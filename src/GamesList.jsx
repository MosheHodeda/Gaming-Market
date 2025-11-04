import React, { useEffect, useState } from 'react';

function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/games')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Games List</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            <p>Price: ${game.price}</p>
            <p>Rating: {game.rating}</p>
            <img src={game.image_url} alt={game.name} width={150} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamesList
