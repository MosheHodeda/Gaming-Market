import { useState } from 'react'
import { Link } from 'react-router-dom'

function GameCard({ game }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    return favorites.some(fav => fav.id === game.id)
  })

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push({
      id: game.id,
      name: game.name,
      image: game.background_image,
      price: game.price
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.id !== game.id)
      localStorage.setItem('favorites', JSON.stringify(updated))
      setIsFavorite(false)
    } else {
      favorites.push({
        id: game.id,
        name: game.name,
        dateAdded: new Date().toLocaleDateString('he-IL')
      })
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card h-100" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} 
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* תמונה */}
        <div className="card-img-top position-relative" style={{ height: '200px', backgroundColor: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
          {!imageError ? (
            <img 
              src={game.background_image} 
              alt={game.name}
              onError={() => setImageError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              backgroundColor: '#e9ecef',
              fontSize: '40px'
            }}>
              🎮
            </div>
          )}

          {/* כפתור לב */}
          <button
            className={`btn btn-sm position-absolute top-2 start-2 ${isFavorite ? 'btn-danger' : 'btn-light'}`}
            onClick={handleFavorite}
            style={{ border: 'none' }}
            title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text text-muted flex-grow-1">
            {game.platforms?.map(p => p.platform.name).join(', ') || 'מעלה וידא'}
          </p>
          
          <div className="mb-2">
            <span className="badge bg-warning">⭐ {game.rating}</span>
          </div>
        </div>

        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-success mb-0">₪{game.price}</h4>
            <button
              className={`btn btn-sm ${addedToCart ? 'btn-success' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? '✅ התווסף' : '🛒 קנה'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GameCard
