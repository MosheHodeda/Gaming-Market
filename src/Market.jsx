import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GameCard from './GameCard'

function Market() {
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
    }
  ])
  
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const navigate = useNavigate()

  useEffect(() => {
    const querySearch = searchParams.get('search')
    if (querySearch) {
      setSearch(querySearch)
    }
  }, [searchParams])

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/market?search=${encodeURIComponent(search)}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">🛍️ משחקים פופולריים</h1>

      <div className="mb-4">
        <form onSubmit={handleSearch}>
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 חפש משחקים..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="btn btn-primary" 
              type="submit"
            >
              🔍 חפש
            </button>
          </div>
        </form>
      </div>

      <div className="row g-4 mb-5">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="col-md-6 col-lg-4">
              <GameCard game={game} />
            </div>
          ))
        ) : (
          <p className="text-muted">אין משחקים בחיפוש זה</p>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-lg btn-outline-primary"
          onClick={() => navigate('/all-games')}
        >
          📚 הצג את כל המשחקים
        </button>
      </div>
    </div>
  )
}

export default Market
