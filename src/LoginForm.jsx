import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from './firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
import PasswordInput from './PasswordInput'

function LoginForm() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username || formData.username.trim().length === 0) {
      newErrors.username = 'שם משתמש חובה'
    }

    if (!formData.password || formData.password.length === 0) {
      newErrors.password = 'סיסמה חובה'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setErrors({})
    setLoading(true)

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      // חיפוש המשתמש ב-Firebase
      const q = query(
        collection(db, 'users'),
        where('username', '==', formData.username.trim())
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setErrors({ submit: 'שם משתמש או סיסמה שגויים' })
        setLoading(false)
        return
      }

      const user = querySnapshot.docs[0].data()

      // בדיקת הסיסמה
      if (user.password !== formData.password) {
        setErrors({ submit: 'שם משתמש או סיסמה שגויים' })
        setLoading(false)
        return
      }

      // התחברות הצליחה
      setSuccess(true)

      // שמירה בלוקאל סטוריג'
      const userData = {
        username: user.username,
        email: user.email
      }
      localStorage.setItem('loggedInUser', JSON.stringify(userData))

      // הפניה לדף הבית אחרי 1 שנייה
      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'שגיאה בהתחברות' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">🔐 התחברות</h2>

            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ✅ התחברת בהצלחה! מעביר אותך לדף הבית...
              </div>
            )}

            {errors.submit && (
              <div className="alert alert-danger">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">שם משתמש</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="הקלד שם משתמש"
                  disabled={loading}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <PasswordInput
                name="password"
                label="סיסמה"
                value={formData.password}
                onChange={handleChange}
                placeholder="הקלד סיסמה"
                error={errors.password}
                disabled={loading}
              />

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'טוען...' : 'התחבר'}
              </button>
            </form>

            <p className="text-center text-muted mt-3">
              עדיין אין חשבון? <a href="/">הרשם כאן</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
