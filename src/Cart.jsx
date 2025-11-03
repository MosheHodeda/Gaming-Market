import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // שלח Custom Event
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const clearCart = () => {
    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))
    
    // שלח Custom Event
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  const getTotalItems = () => {
    return cart.length
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">🛒 עגלת הקניות שלך</h1>

      {cart.length === 0 ? (
        <div className="alert alert-info">
          <h4>אין משחקים בעגלה 😢</h4>
          <p>בואו נמצא לך משחקים מעניינים!</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/market')}
          >
            🎮 חזור לשוק
          </button>
        </div>
      ) : (
        <>
          {/* טבלה של המשחקים */}
          <div className="table-responsive mb-4">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>משחק</th>
                  <th>מחיר</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="text-success fw-bold">₪{item.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(index)}
                      >
                        🗑️ מחק
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* סיכום */}
          <div className="row mb-4">
            <div className="col-md-6 ms-auto">
              <div className="card p-4 bg-light">
                <h5 className="mb-3">📊 סיכום הזמנה</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>מספר משחקים:</span>
                  <strong>{getTotalItems()}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                  <span>סכום כולל:</span>
                  <strong className="text-success">₪{getTotalPrice()}</strong>
                </div>
                
                <button 
                  className="btn btn-primary btn-lg w-100 mb-2"
                  onClick={() => navigate('/checkout')}
                >
                  💳 בצע קנייה
                </button>

                <button 
                  className="btn btn-outline-secondary w-100 mb-2"
                  onClick={() => navigate('/market')}
                >
                  🛍️ המשך קניות
                </button>

                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={clearCart}
                >
                  🗑️ נקה את העגלה
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
