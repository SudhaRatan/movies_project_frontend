import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DefNavbar from '../components/Navbar';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import SearchPage from '../pages/Search';
import AdminLoginPage from '../pages/AdminLogin';
import AddMovie from '../pages/AddMovie';
import BookMovie from '../pages/BookMovie';
import MyBookings from '../pages/MyBookings';
import AdminDashboard from '../pages/AdminDashboard';
import Init from '../pages/Init';

const DefaultRouter = () => {

  return (
    <BrowserRouter>
      <DefNavbar />
      <div style={{ height: 100 }} />
      <Routes>
        <Route exact path="/" element={<Init />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/addmovie" element={<AddMovie />} /> */}
        <Route path="/bookmovie" element={<BookMovie />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default DefaultRouter