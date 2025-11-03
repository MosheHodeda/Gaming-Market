import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function Navbar() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const navigate = useNavigate()
  const navbarCollapseRef = useRef(null)
  const navbarToggleRef = useRef(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }

    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      setCartCount(cart.length)
      setFavoritesCount(favorites.length)
    }

    updateCounts()

    window.addEventListener('cartUpdated', updateCounts)
    
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('loggedInUser')
      setUser(updatedUser ? JSON.parse(updatedUser) : null)
      updateCounts()
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', updateCounts)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)
    closeNavbar()
    navigate('/')
  }

  const closeNavbar = () => {
    if (navbarToggleRef.current && navbarCollapseRef.current) {
      navbarToggleRef.current.click()
    }
  }

  const handleNavigation = (path) => {
    navigate(path)
    closeNavbar()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🎮 Gaming Market</Link>

        <div className="d-flex align-items-center gap-2 order-lg-last">
          {/* כפתור מועדפים */}
          <Link to="/favorites" className="btn btn-outline-danger position-relative" title="מועדפים">
            ❤️
            {favoritesCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* כפתור עגלה */}
          <Link to="/cart" className="btn btn-outline-info position-relative" title="עגלה">
            🛒
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            ref={navbarToggleRef}
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div 
          ref={navbarCollapseRef}
          className="collapse navbar-collapse" 
          id="navbarNav"
        >
          {/* תפריט ראשי */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>🏠 דף הבית</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/market" onClick={closeNavbar}>🛍️ שוק</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-games" onClick={closeNavbar}>📚 כל המשחקים</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics" onClick={closeNavbar}>📊 סטטיסטיקות</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard" onClick={closeNavbar}>🏆 לוח דירוג</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeNavbar}>📧 יצירת קשר</Link>
            </li>
          </ul>

          {/* תפריט משתמש */}
          <div className="mt-3 mt-lg-0 pt-3 pt-lg-0 border-top border-lg-0">
            {user ? (
              <>
                <h6 className="mb-2 text-muted">👤 {user.username}</h6>
                <div className="d-grid gap-2 d-lg-flex gap-lg-2">
                  <Link 
                    to="/profile" 
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    onClick={closeNavbar}
                  >
                    📋 פרופיל
                  </Link>
                  <Link 
                    to="/profile" 
                    className="btn btn-sm btn-outline-info flex-grow-1"
                    onClick={closeNavbar}
                  >
                    📦 הזמנות
                  </Link>
                  <Link 
                    to="/settings" 
                    className="btn btn-sm btn-outline-secondary flex-grow-1"
                    onClick={closeNavbar}
                  >
                    ⚙️ הגדרות
                  </Link>
                  <button 
                    className="btn btn-sm btn-danger flex-grow-1"
                    onClick={handleLogout}
                  >
                    🚪 התנתק
                  </button>
                </div>
              </>
            ) : (
              <div className="d-grid gap-2 d-lg-flex gap-lg-2">
                <Link 
                  to="/login" 
                  className="btn btn-sm btn-primary flex-grow-1"
                  onClick={closeNavbar}
                >
                  🔑 כניסה
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
