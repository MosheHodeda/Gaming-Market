import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('info')
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (!loggedInUser) {
      navigate('/login')
      return
    }
    
    const userData = JSON.parse(loggedInUser)
    setUser(userData)

    // טען הזמנות מ-localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders')) || []
    setOrders(allOrders)
  }, [navigate])

  if (!user) {
    return null
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">👤 הפרופיל שלי</h1>

      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            📋 מידע אישי
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 הזמנות ({orders.length})
          </button>
        </li>
      </ul>

      {/* טאב מידע אישי */}
      {activeTab === 'info' && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="mb-3">
                <label className="form-label"><strong>שם משתמש:</strong></label>
                <p className="form-control bg-light">{user.username}</p>
              </div>
              <div className="mb-3">
                <label className="form-label"><strong>אימייל:</strong></label>
                <p className="form-control bg-light">{user.email}</p>
              </div>
              <button className="btn btn-primary w-100 mb-2">עדכן פרטים</button>
              <button className="btn btn-warning w-100">🔐 שנה סיסמה</button>
            </div>
          </div>
        </div>
      )}

      {/* טאב הזמנות */}
      {activeTab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <div className="alert alert-info">
              <h4>אין הזמנות עדיין 📭</h4>
              <p>בואו נתחיל לקנות!</p>
              <a href="/market" className="btn btn-primary">
                🛍️ לחנות
              </a>
            </div>
          ) : (
            <div className="row">
              {orders.map((order, idx) => (
                <div key={idx} className="col-md-6 mb-3">
                  <div className="card p-3">
                    <div className="d-flex justify-content-between mb-2">
                      <h6>הזמנה #{order.id}</h6>
                      <span className="badge bg-success">✅ בוצעה</span>
                    </div>
                    
                    <p className="text-muted mb-2">📅 {order.date}</p>
                    
                    <div className="mb-2">
                      <strong>משחקים:</strong>
                      <ul className="small mb-0 mt-1">
                        {order.items.map((item, i) => (
                          <li key={i}>{item.name} - ₪{item.price}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="d-flex justify-content-between border-top pt-2 mt-2">
                      <span><strong>סה"כ:</strong></span>
                      <span className="text-success fw-bold">₪{order.total}</span>
                    </div>

                    <button className="btn btn-sm btn-outline-primary w-100 mt-2">
                      📧 שלח חשבונית
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
