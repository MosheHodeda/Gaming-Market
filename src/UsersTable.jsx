import { useState, useEffect } from 'react'

function UsersTable() {
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    loadUsers()
    window.addEventListener('usersUpdated', loadUsers)
    return () => window.removeEventListener('usersUpdated', loadUsers)
  }, [])

  const loadUsers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(users)
  }

  const deleteUser = (id) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updated = users.filter(user => user.id !== id)
    localStorage.setItem('users', JSON.stringify(updated))
    setUsers(updated)
  }

  const handleShowUsers = () => {
    setShowUsers(!showUsers)
  }

  return (
    <div className="container mt-5 mb-5">
      <h2>👥 משתמשים רשומים</h2>

      <button 
        className="btn btn-info mb-3" 
        onClick={handleShowUsers}
      >
        {showUsers ? '🔽 הסתר משתמשים' : '🔼 הצג משתמשים'}
      </button>

      {showUsers && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>שם משתמש</th>
                <th>אימייל</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        🗑️ מחק
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    אין משתמשים רשומים עדיין
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsersTable
