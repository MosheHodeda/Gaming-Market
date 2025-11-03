import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">📞 יצירת קשר</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            {success && (
              <div className="alert alert-success">
                ✅ ההודעה נשלחה בהצלחה!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">שם</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">אימייל</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">הודעה</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                שלח
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
