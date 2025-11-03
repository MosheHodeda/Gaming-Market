import { useState } from 'react'

function GamesTable() {
  const [games, setGames] = useState([
    { id: 1, name: 'Fortnite', genre: 'Battle Royale', price: 0, status: 'פעיל' },
    { id: 2, name: 'Valorant', genre: 'FPS', price: 0, status: 'פעיל' },
    { id: 3, name: 'Elden Ring', genre: 'RPG', price: 60, status: 'פעיל' }
  ])

  const [newGame, setNewGame] = useState({
    name: '',
    genre: '',
    price: '',
    status: 'פעיל'
  })

  
  const addGame = () => {
    if (!newGame.name || !newGame.genre || !newGame.price) {
      alert('אנא מלא את כל השדות')
      return
    }

    const game = {
      id: Date.now(),
      name: newGame.name,
      genre: newGame.genre,
      price: parseFloat(newGame.price),
      status: newGame.status
    }

    setGames([...games, game])
    setNewGame({ name: '', genre: '', price: '', status: 'פעיל' })
  }

  
  const deleteGame = (id) => {
    setGames(games.filter(game => game.id !== id))
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">📊 ניהול משחקים</h2>

      
      <div className="card mb-4 p-4">
        <h5 className="mb-3">➕ הוסף משחק חדש</h5>
        <div className="row">
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="שם המשחק"
              value={newGame.name}
              onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ז'אנר"
              value={newGame.genre}
              onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
            />
          </div>
          <div className="col-md-2 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="מחיר"
              value={newGame.price}
              onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
            />
          </div>
          <div className="col-md-2 mb-3">
            <select
              className="form-control"
              value={newGame.status}
              onChange={(e) => setNewGame({ ...newGame, status: e.target.value })}
            >
              <option>פעיל</option>
              <option>לא פעיל</option>
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <button
              className="btn btn-success w-100"
              onClick={addGame}
            >
              הוסף
            </button>
          </div>
        </div>
      </div>

     
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>שם המשחק</th>
              <th>ז'אנר</th>
              <th>מחיר</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map(game => (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.genre}</td>
                  <td>{game.price === 0 ? 'חינם' : `$${game.price}`}</td>
                  <td>
                    <span className={`badge ${game.status === 'פעיל' ? 'bg-success' : 'bg-danger'}`}>
                      {game.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteGame(game.id)}
                    >
                      🗑️ מחק
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  אין משחקים בטבלה
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-muted mt-3">
        <strong>סה"כ משחקים:</strong> {games.length}
      </p>
    </div>
  )
}

export default GamesTable
