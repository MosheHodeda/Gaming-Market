import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function GameDetails() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const allGames = [
    {
      id: 1,
      name: 'The Witcher 3',
      rating: 4.8,
      price: 99,
      background_image: 'https://via.placeholder.com/500x300/2c3e50/ffffff?text=The+Witcher+3',
      description: 'משחק RPG אפיקי עם סיפור מדהים וקרבות מעוררים.'
    },
    {
      id: 2,
      name: 'Elden Ring',
      rating: 4.6,
      price: 79,
      background_image: 'https://via.placeholder.com/500x300/e74c3c/ffffff?text=Elden+Ring',
      description: 'משחק אקשן RPG קשה עם עולם פתוח ענק.'
    },
    {
      id: 3,
      name: 'Baldurs Gate 3',
      rating: 4.7,
      price: 89,
      background_image: 'https://via.placeholder.com/500x300/27ae60/ffffff?text=Baldurs+Gate+3',
      description: 'משחק RPG טורני עם בחירות כמעט אינסופיות.'
    },
    {
      id: 4,
      name: 'Cyberpunk 2077',
      rating: 4.2,
      price: 69,
      background_image: 'https://via.placeholder.com/500x300/8e44ad/ffffff?text=Cyberpunk+2077',
      description: 'משחק RPG בעיר העתידה עם ייצור קרקטר מעמיק.'
    }
  ]

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }

    const selectedGame = allGames.find(g => g.id === parseInt(gameId))
    setGame(selectedGame)

    const allReviews = JSON.parse(localStorage.getItem('reviews')) || []
    const gameReviews = allReviews.filter(r => r.gameId === parseInt(gameId))
    setReviews(gameReviews)

    // בדוק אם המשחק במועדפים
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isFav = favorites.some(fav => fav.id === parseInt(gameId))
    setIsFavorite(isFav)
  }, [gameId])

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!user) {
      alert('צריך להתחבר כדי לכתוב ביקורת!')
      navigate('/login')
      return
    }

    if (rating === 0) {
      alert('בחר דירוג כוכבים!')
      return
    }

    if (!review.trim()) {
      alert('כתוב ביקורת!')
      return
    }

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      gameId: parseInt(gameId),
      username: user.username,
      rating,
      text: review,
      date: new Date().toLocaleDateString('he-IL')
    }

    const allReviews = JSON.parse(localStorage.getItem('reviews')) || []
    allReviews.push(newReview)
    localStorage.setItem('reviews', JSON.stringify(allReviews))

    setReviews([newReview, ...reviews])
    setRating(0)
    setReview('')
    alert('✅ ביקורת שלך נשמרה!')
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push({
      id: game.id,
      name: game.name,
      image: game.background_image,
      price: game.price
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    alert('✅ נוסף לעגלה!')
  }

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.id !== game.id)
      localStorage.setItem('favorites', JSON.stringify(updated))
      setIsFavorite(false)
      alert('❌ הוסר ממועדפים')
    } else {
      favorites.push({
        id: game.id,
        name: game.name,
        dateAdded: new Date().toLocaleDateString('he-IL')
      })
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
      alert('❤️ הוסף למועדפים!')
    }
  }

  if (!game) {
    return <div className="container mt-5">⏳ טוען...</div>
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="container mt-5 mb-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/market')}>
        ← חזור לשוק
      </button>

      <div className="row mb-5">
        {/* תמונה */}
        <div className="col-md-4 mb-4 mb-md-0">
          <img 
            src={game.background_image}
            className="img-fluid rounded"
            alt={game.name}
          />
        </div>

        {/* פרטים */}
        <div className="col-md-8">
          <h1 className="mb-2">{game.name}</h1>
          
          <div className="mb-3">
            <span className="badge bg-warning">⭐ {game.rating}</span>
            {reviews.length > 0 && (
              <span className="ms-2 text-muted">
                ({reviews.length} ביקורות, ממוצע: {averageRating} ⭐)
              </span>
            )}
          </div>

          <p className="text-muted mb-3">{game.description}</p>

          <h3 className="text-success mb-3">₪{game.price}</h3>

          <button
            className="btn btn-primary btn-lg me-2 mb-2"
            onClick={handleAddToCart}
          >
            🛒 הוסף לעגלה
          </button>
          <button 
            className={`btn btn-lg mb-2 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={handleFavorite}
          >
            {isFavorite ? '❤️ הסר ממועדפים' : '🤍 שמור'}
          </button>
        </div>
      </div>

      {/* ביקורות */}
      <div className="row">
        <div className="col-lg-8">
          <h3 className="mb-4">💬 ביקורות</h3>

          {/* טופס הוספת ביקורת */}
          <div className="card p-4 mb-4">
            <h5>כתוב ביקורת</h5>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-3">
                <label className="form-label d-block mb-2">דירוג:</label>
                <div className="fs-3" style={{ letterSpacing: '8px', padding: '10px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      onClick={() => {
                        setRating(star)
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        cursor: 'pointer',
                        color: (hoverRating || rating) >= star ? '#ffc107' : '#ddd',
                        fontSize: '32px',
                        marginRight: '8px',
                        transition: 'color 0.1s'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {rating > 0 && <p className="mt-2 text-info">דירוג שלך: {rating} ⭐</p>}
              </div>

              <div className="mb-3">
                <label className="form-label">הביקורת שלך:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="כתוב את הביקורת שלך כאן..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                📤 שלח ביקורת
              </button>
            </form>
          </div>

          {/* רשימת ביקורות */}
          <h5 className="mb-3">ביקורות ({reviews.length})</h5>
          {reviews.length === 0 ? (
            <p className="text-muted">אין ביקורות עדיין. הוא ראשון! 👇</p>
          ) : (
            reviews.map(r => (
              <div key={r.id} className="card p-3 mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{r.username}</strong>
                    <br />
                    <div className="text-warning my-2">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}
                    </div>
                  </div>
                  <small className="text-muted">{r.date}</small>
                </div>
                <p className="mb-0 mt-2 text-dark">{r.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default GameDetails
