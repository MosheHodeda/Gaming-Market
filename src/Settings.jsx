import { useState } from 'react'

function Settings() {
  const [activeTab, setActiveTab] = useState('password')

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [successMessage, setSuccessMessage] = useState('')

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // כאן תוסיף לוגיקה של שינוי סיסמה
    setSuccessMessage('✅ הסיסמה שונתה בהצלחה!')
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleDeleteAccount = () => {
    if (confirm('האם אתה בטוח? הפעולה הזו לא ניתן לשחזר!')) {
      // כאן תוסיף לוגיקה של מחיקת חשבון
      alert('חשבונך נמחק בהצלחה')
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <h2 className="mb-4">⚙️ הגדרות</h2>

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <ul className="nav nav-tabs mb-4" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  🔐 שנה סיסמה
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'danger' ? 'active' : ''}`}
                  onClick={() => setActiveTab('danger')}
                >
                  ⚠️ אזור סכנה
                </button>
              </li>
            </ul>

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label">סיסמה ישנה</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">סיסמה חדשה</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">אישור סיסמה חדשה</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  שנה סיסמה
                </button>
              </form>
            )}

            {activeTab === 'danger' && (
              <div>
                <div className="alert alert-danger">
                  ⚠️ פעולות אלה אינן ניתנות לשחזור!
                </div>
                <button
                  className="btn btn-danger w-100"
                  onClick={handleDeleteAccount}
                >
                  🗑️ מחק את החשבון שלי
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
