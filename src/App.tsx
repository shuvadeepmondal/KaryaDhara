import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/landingpage/Hero';
import Navbar from './components/Navbar';
import Particle from './components/Particle';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Toaster } from 'sonner';
import Dashboard from './components/dashboard/Dashboard';
import AddTaskForm from './components/form/AddTaskForm';
import NotificationModal from './components/notification_panel/NotificationModal';

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
          <Route path="/add_task" element={<AddTaskForm />} />
          <Route path ="/" element={<NotificationModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } }/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;
