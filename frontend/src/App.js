import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Dashboard/Home';
import Admin from './components/Dashboard/Admin';
import Dashboard from './components/Dashboard/UserDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/User/Profile';

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
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
