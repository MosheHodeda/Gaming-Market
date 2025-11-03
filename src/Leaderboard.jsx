import { useEffect, useState } from 'react'
import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

function Leaderboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersList)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">🏆 לוח דירוג</h1>
      {loading ? (
        <p>טוען...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>שם משתמש</th>
                <th>אימייל</th>
                <th>תאריך הרשמה</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString('he-IL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
