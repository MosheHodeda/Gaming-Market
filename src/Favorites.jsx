import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GameCard from './GameCard'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const allGames = [
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
  ]

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (!loggedInUser) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(loggedInUser))

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(savedFavorites)
  }, [navigate])

  const removeFavorite = (gameId) => {
    const updated = favorites.filter(fav => fav.id !== gameId)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const clearAllFavorites = () => {
    if (window.confirm('בטוח שתרצה למחוק הכל?')) {
      setFavorites([])
      localStorage.setItem('favorites', JSON.stringify([]))
    }
  }

  const favoriteGames = allGames.filter(game => 
    favorites.some(fav => fav.id === game.id)
  )

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>❤️ המשחקים המועדפים שלי</h1>
        {favorites.length > 0 && (
          <button 
            className="btn btn-danger btn-sm"
            onClick={clearAllFavorites}
          >
            🗑️ מחק הכל
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <h4>עדיין אין משחקים מועדפים 😢</h4>
          <p>לחץ על ❤️ בכרטיסיית משחק כדי להוסיף למועדפים</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/market')}
          >
            🛍️ חזור לשוק
          </button>
        </div>
      ) : (
        <>
          <div className="alert alert-success mb-4">
            <strong>📊 יש לך {favorites.length} משחקים מועדפים</strong>
          </div>

          <div className="row g-4">
            {favoriteGames.map(game => (
              <div key={game.id} className="col-md-6 col-lg-4 position-relative">
                <GameCard game={game} />
                <button
                  className="btn btn-sm btn-danger position-absolute"
                  style={{ top: '10px', right: '10px', zIndex: '10' }}
                  onClick={() => removeFavorite(game.id)}
                  title="הסר ממועדפים"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-primary btn-lg me-2"
              onClick={() => navigate('/market')}
            >
              🛍️ המשך קניות
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/')}
            >
              🏠 חזור לבית
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Favorites
