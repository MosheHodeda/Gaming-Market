import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  // רשימת המשחקים לחיפוש
  const allGames = [
    'The Witcher 3',
    'Elden Ring',
    'Baldurs Gate 3',
    'Cyberpunk 2077',
    'Starfield',
    'Palworld',
    'Valorant',
    'Counter Strike',
    'Minecraft',
    'Fortnite'
  ]

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim().length > 0) {
      // סינון ההשלמות
      const filtered = allGames.filter(game =>
        game.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5)) // הצג עד 5 הצעות
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion)
    setSuggestions([])
    setShowSuggestions(false)
    navigate(`/market?search=${encodeURIComponent(suggestion)}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/market?search=${encodeURIComponent(search)}`)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSearch}>
            <div className="position-relative">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 חפש משחקים..."
                  value={search}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => search && setSuggestions(allGames.filter(g => g.toLowerCase().includes(search.toLowerCase())).slice(0, 5)) && setShowSuggestions(true)}
                />
                <button 
                  className="btn btn-primary" 
                  type="submit"
                >
                  🔍 חפש
                </button>
              </div>

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      🎮 {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
