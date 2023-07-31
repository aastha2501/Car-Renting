import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin/Admin';
import Dashboard from './components/User/UserDashboard';
import Profile from './components/User/Profile';
import Home from './components/Home';
import UserBookings from './components/User/UserBookings';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/bookings/:userId' element={<UserBookings/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
