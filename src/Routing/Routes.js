import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DefNavbar from '../components/Navbar';
import LoginPage from '../pages/Login';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../App';
import SignupPage from '../pages/Signup';
import SearchPage from '../pages/Search';
import AdminLoginPage from '../pages/AdminLogin';
import AddMovie from '../pages/AddMovie';
import BookMovie from '../pages/BookMovie';
import MyBookings from '../pages/MyBookings';
import AdminDashboard from '../pages/AdminDashboard';

const DefaultRouter = () => {

  return (
    <BrowserRouter>
      <DefNavbar />
      <div style={{ height: 55 }} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/bookmovie" element={<BookMovie />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default DefaultRouter