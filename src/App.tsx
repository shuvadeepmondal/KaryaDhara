import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/landingpage/Hero';
import Navbar from './components/Navbar';
import Particle from './components/Particle';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Toaster } from 'sonner';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
      <div className="h-screen w-screen relative">
        <Toaster/>
        <Navbar />
        <Particle />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;
