import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import GameCards from './GameCards'
import Statistics from './Statistics'
import GamesTable from './GamesTable'

function HomeContent() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [justLoggedOut, setJustLoggedOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    if (user) {
      setLoggedInUser(JSON.parse(user))
      setJustLoggedOut(false)
    } else {
      if (loggedInUser) {
        setJustLoggedOut(true)
        setTimeout(() => setJustLoggedOut(false), 4000)
      }
      setLoggedInUser(null)
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('loggedInUser')
      setLoggedInUser(updatedUser ? JSON.parse(updatedUser) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
  }

  return (
    <>
      {justLoggedOut && (
        <div className="alert alert-info m-3 alert-dismissible fade show" role="alert">
          👋 התנתקת בהצלחה! שוב נתראה בקרוב!
        </div>
      )}

      {loggedInUser && (
        <div className="alert alert-info m-3 alert-dismissible fade show" role="alert">
          <h5>ברוכים הבאים! 👋</h5>
          <p className="mb-2">שם משתמש: <strong>{loggedInUser.username}</strong></p>
          <p className="mb-3">אימייל: <strong>{loggedInUser.email}</strong></p>
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            התנתק
          </button>
        </div>
      )}

      <SearchBar />
      <GameCards />
      <Statistics />
      <GamesTable />

      <div className="container mt-5 mb-5">
        <h1 className="text-primary text-center mb-4">
          ניתוח שוק גיימינג ומסחר מקוון
        </h1>

        {/* כפתורים ניידים לדפים חשובים */}
        <div className="row g-3 mb-5 button-container-main">
          <div className="col-md-3">
            <button 
              className="btn btn-primary btn-lg w-100"
              onClick={() => navigate('/market')}
            >
              🚀 התחל עכשיו
            </button>
          </div>
          <div className="col-md-3">
            <button 
              className="btn btn-outline-secondary btn-lg w-100"
              onClick={() => navigate('/all-games')}
            >
              📚 כל המשחקים
            </button>
          </div>
          <div className="col-md-3">
            <button 
              className="btn btn-outline-info btn-lg w-100"
              onClick={() => navigate('/leaderboard')}
            >
              🏆 לוח הדירוג
            </button>
          </div>
          <div className="col-md-3">
            <button 
              className="btn btn-outline-success btn-lg w-100"
              onClick={() => navigate('/statistics')}
            >
              📊 סטטיסטיקות
            </button>
          </div>
        </div>

        {/* סטטיסטיקות */}
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-primary text-white rounded">
              <h2>1000+</h2>
              <p>משתמשים פעילים</p>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="p-3 bg-secondary text-white rounded">
              <h2>500+</h2>
              <p>עסקאות יומיות</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-success text-white rounded">
              <h2>24/7</h2>
              <p>תמיכה טכנית</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeContent
