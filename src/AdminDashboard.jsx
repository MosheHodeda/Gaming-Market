import { useState } from 'react'
import { db } from './firebaseConfig'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import PasswordInput from './PasswordInput'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ADMIN_PASSWORD = 'admin123'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      loadUsers()
    } else {
      alert('סיסמה שגויה!')
    }
  }

  const loadUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersList)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteUser = async (id) => {
    if (confirm('בטוח שברצונך למחוק משתמש זה?')) {
      try {
        await deleteDoc(doc(db, 'users', id))
        setUsers(users.filter(user => user.id !== id))
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  // עמוד התחברות
  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h2 className="text-center mb-4">🔐 Admin Panel</h2>
              <form onSubmit={handleLogin}>
                <PasswordInput
                  name="password"
                  label="סיסמה"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="הכנס סיסמה"
                  disabled={false}
                />
                <button type="submit" className="btn btn-primary w-100">
                  כניסה
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // עמוד ניהול משתמשים
  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 ניהול משתמשים</h2>
        <button 
          className="btn btn-danger"
          onClick={() => setIsAuthenticated(false)}
        >
          התנתק
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>שם משתמש</th>
              <th>אימייל</th>
              <th>תאריך הרשמה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString('he-IL')}</td>
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
                <td colSpan="4" className="text-center text-muted">
                  אין משתמשים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
