import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'creditCard'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    
    if (savedCart.length === 0) {
      navigate('/cart')
    }

    setCart(savedCart)
    setUser(loggedInUser)

    if (loggedInUser) {
      setFormData(prev => ({
        ...prev,
        fullName: loggedInUser.username || '',
        email: loggedInUser.email || ''
      }))
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // סימולציה של עיבוד תשלום
    setTimeout(() => {
      // שמור הזמנה
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleDateString('he-IL'),
        customer: formData,
        items: cart,
        total: getTotalPrice(),
        status: 'completed'
      }

      // שמור ב-localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || []
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      // נקה עגלה
      localStorage.setItem('cart', JSON.stringify([]))
      window.dispatchEvent(new Event('cartUpdated'))

      alert('✅ הזמנה בוצעה בהצלחה!\nמספר הזמנה: ' + order.id)
      navigate('/')
      setIsSubmitting(false)
    }, 2000)
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">💳 סיום קנייה</h1>

      <div className="row">
        {/* טופס */}
        <div className="col-lg-8 mb-4">
          <div className="card p-4">
            <h5 className="mb-3">פרטי המשלוח</h5>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">שם מלא</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">אימייל</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">טלפון</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">כתובת</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">עיר</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">מיקוד</label>
                  <input
                    type="text"
                    className="form-control"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <h5 className="mb-3 mt-4">שיטת תשלום</h5>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={handleInputChange}
                    id="creditCard"
                  />
                  <label className="form-check-label" htmlFor="creditCard">
                    💳 כרטיס אשראי
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    id="paypal"
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    🅿️ PayPal
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="bitcoin"
                    checked={formData.paymentMethod === 'bitcoin'}
                    onChange={handleInputChange}
                    id="bitcoin"
                  />
                  <label className="form-check-label" htmlFor="bitcoin">
                    ₿ Bitcoin
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ מעבד תשלום...' : '✅ בצע הזמנה'}
              </button>
            </form>
          </div>
        </div>

        {/* סיכום */}
        <div className="col-lg-4">
          <div className="card p-4 bg-light position-sticky" style={{ top: '20px' }}>
            <h5 className="mb-3">📋 סיכום הזמנה</h5>

            <div className="mb-3">
              {cart.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                  <span>{item.name}</span>
                  <span className="text-success">₪{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>סכום ביניים:</span>
                <span>₪{getTotalPrice()}</span>
              </div>
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>משלוח:</span>
                <span className="text-success">חינם</span>
              </div>
            </div>

            <div className="mb-3 pb-3 border-top pt-3">
              <div className="d-flex justify-content-between">
                <strong>סה"כ לתשלום:</strong>
                <strong className="text-success fs-5">₪{getTotalPrice()}</strong>
              </div>
            </div>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate('/cart')}
            >
              ← חזור לעגלה
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
