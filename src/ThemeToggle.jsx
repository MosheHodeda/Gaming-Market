import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button 
      className="btn btn-outline-light ms-2" 
      onClick={toggleTheme}
      title="החלף עיצוב"
    >
      {theme === 'dark' ? '☀️ בהיר' : '🌙 כהה'}
    </button>
  )
}

export default ThemeToggle
