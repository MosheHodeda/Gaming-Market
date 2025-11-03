import { useState } from 'react'

function GameCards() {
  // State - רשימת משחקים
  const [games, setGames] = useState([
    {
      id: 1,
      name: 'Fortnite',
      price: 0,
      players: '350M+',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Valorant',
      price: 0,
      players: '25M+',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Elden Ring',
      price: 60,
      players: '20M+',
      rating: 4.8
    },
    {
      id: 4,
      name: 'CS:GO',
      price: 0,
      players: '32M+',
      rating: 4.6
    }
  ])

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">🎮 משחקים פופולריים</h2>

      <div className="row">
        {games.map(game => (
          <div key={game.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text text-muted">
                  👥 {game.players} שחקנים
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-warning">⭐ {game.rating}</span>
                  <span className="fw-bold">
                    {game.price === 0 ? 'חינם' : `${game.price}$`}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-sm btn-primary w-100">
                  להורדה
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameCards
