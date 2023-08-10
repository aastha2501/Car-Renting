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
import Brands from './components/Admin/Brands';
import Bookings from './components/Admin/Bookings';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import EditProduct from './components/Admin/EditProduct';

function App() {
  return (
    <>
      {/* <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/bookings/:userId' element={<UserBookings/>}/>
      <Route path='/bookings' element={<Bookings/>}/>
      <Route path='/brands' element={<Brands/>}/>
     </Routes>
    <Footer/> 
    </BrowserRouter> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/admin"
            element={<ProtectedRoute roles={['Admin']} >
              <Admin />
            </ProtectedRoute>}
          />


          {/* <Route
            path="/dashboard"
            element={<ProtectedRoute roles={['User', 'Admin']}>
              <Dashboard />
            </ProtectedRoute>}
          /> */}
          <Route
            path="/profile/:userId"
            element={<ProtectedRoute roles={['User', 'Admin']}>
              <Profile />
            </ProtectedRoute>}
          />
          <Route
            path="/bookings/:userId"
            element={<ProtectedRoute roles={['User', 'Admin']}>
              <UserBookings />
            </ProtectedRoute>}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoute roles={['Admin']}>
              <Bookings />
            </ProtectedRoute>}
          />
          <Route
            path="/brands"
            element={<ProtectedRoute roles={['Admin']}>
              <Brands />
            </ProtectedRoute>}
          />
          <Route
            path="/edit/:id"
            element={<ProtectedRoute roles={['Admin']}> 
              <EditProduct/>
            </ProtectedRoute>}
          />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
