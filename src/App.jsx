import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import HomeContent from './HomeContent'
import LoginForm from './LoginForm'
import AdminDashboard from './AdminDashboard'
import Market from './Market'
import AllGames from './AllGames'
import StatisticsPage from './Statistics'
import Contact from './Contact'
import Profile from './Profile'
import Leaderboard from './Leaderboard'
import Settings from './Settings'
import Cart from './Cart'
import Checkout from './Checkout'
import GameDetails from './GameDetails'
import Favorites from './Favorites'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
        <Route path="/favorites" element={<Favorites />} />

      </Routes>
    </Router>
  )
}

export default App
