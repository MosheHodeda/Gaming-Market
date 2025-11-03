import { useState } from 'react'
import { db } from './firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import PasswordInput from './PasswordInput'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // בדיקת שם משתמש - לא ריק, לא רווחים בלבד
    if (!formData.username || formData.username.trim().length === 0) {
      newErrors.username = 'שם משתמש חובה'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'שם משתמש חייב להיות לפחות 3 תווים'
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין'
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להיות לפחות 6 תווים'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות'
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'עליך להסכים לתנאים'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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

    const newUser = {
      username: formData.username.trim(),
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    }

    try {
      await addDoc(collection(db, 'users'), newUser)
      setSuccess(true)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      })
      window.dispatchEvent(new Event('usersUpdated'))
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'שגיאה בשמירת המשתמש' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">📝 הרשמה</h2>

            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ✅ הרשמתך בוצעה בהצלחה!
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

              <div className="mb-3">
                <label className="form-label">אימייל</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={loading}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
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

              <PasswordInput
                name="confirmPassword"
                label="אישור סיסמה"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="אשר סיסמה"
                error={errors.confirmPassword}
                disabled={loading}
              />

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  id="agreeTerms"
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  אני מסכים לתנאי השימוש
                </label>
                {errors.agreeTerms && (
                  <div className="invalid-feedback d-block">{errors.agreeTerms}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'טוען...' : 'הרשם עכשיו'}
              </button>
            </form>

            <p className="text-center text-muted mt-3">
              כבר יש לך חשבון? <a href="/login">התחבר</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
