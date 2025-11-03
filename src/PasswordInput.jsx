import { useState } from 'react'

function PasswordInput({ 
  value, 
  onChange, 
  placeholder = 'הקלד סיסמה', 
  label = 'סיסמה',
  error = null,
  disabled = false,
  name = 'password'
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          title={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
      {error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  )
}

export default PasswordInput
