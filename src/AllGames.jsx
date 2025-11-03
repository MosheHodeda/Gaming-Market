import { useState } from 'react'
import GameCard from './GameCard'

function AllGames() {
  const [games] = useState([
    {
      id: 1,
      name: 'The Witcher 3',
      rating: 4.8,
      price: 99,
      background_image: 'https://via.placeholder.com/500x300/2c3e50/ffffff?text=The+Witcher+3',
      platforms: [{ platform: { name: 'PC' } }]
    },
    {
      id: 2,
      name: 'Elden Ring',
      rating: 4.6,
      price: 79,
      background_image: 'https://via.placeholder.com/500x300/e74c3c/ffffff?text=Elden+Ring',
      platforms: [{ platform: { name: 'PC' } }]
    },
    {
      id: 3,
      name: 'Baldurs Gate 3',
      rating: 4.7,
      price: 89,
      background_image: 'https://via.placeholder.com/500x300/27ae60/ffffff?text=Baldurs+Gate+3',
      platforms: [{ platform: { name: 'PC' } }]
    },
    {
      id: 4,
      name: 'Cyberpunk 2077',
      rating: 4.2,
      price: 69,
      background_image: 'https://via.placeholder.com/500x300/8e44ad/ffffff?text=Cyberpunk+2077',
      platforms: [{ platform: { name: 'PC' } }]
    },
    {
      id: 5,
      name: 'Starfield',
      rating: 3.9,
      price: 79,
      background_image: 'https://via.placeholder.com/500x300/3498db/ffffff?text=Starfield',
      platforms: [{ platform: { name: 'PC' } }]
    },
    {
      id: 6,
      name: 'Palworld',
      rating: 4.3,
      price: 59,
      background_image: 'https://via.placeholder.com/500x300/f39c12/ffffff?text=Palworld',
      platforms: [{ platform: { name: 'PC' } }]
    }
  ])
  
  const [filterRating, setFilterRating] = useState(0)
  const [filterPrice, setFilterPrice] = useState(300)
  const [sortBy, setSortBy] = useState('rating')

  let filteredGames = games.filter(game => {
    return game.rating >= filterRating && game.price <= filterPrice
  })

  if (sortBy === 'rating') {
    filteredGames.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'name') {
    filteredGames.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'price') {
    filteredGames.sort((a, b) => a.price - b.price)
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">📚 כל המשחקים</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label">⭐ דירוג מינימלי: {filterRating}</label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5"
            step="0.5"
            value={filterRating}
            onChange={(e) => setFilterRating(parseFloat(e.target.value))}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">💰 מחיר מקסימלי: ₪{filterPrice}</label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="300"
            step="10"
            value={filterPrice}
            onChange={(e) => setFilterPrice(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">🔀 מיין לפי:</label>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating">⭐ דירוג (גבוה לנמוך)</option>
          <option value="name">📝 שם (א-ת)</option>
          <option value="price">💰 מחיר (זול לקבוע)</option>
        </select>
      </div>

      <p className="text-muted mb-4">
        מצאתי {filteredGames.length} משחקים
      </p>
      
      <div className="row g-4">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="col-md-6 col-lg-4">
              <GameCard game={game} />
            </div>
          ))
        ) : (
          <p className="text-muted">אין משחקים התואמים לסינון שלך</p>
        )}
      </div>
    </div>
  )
}

export default AllGames
