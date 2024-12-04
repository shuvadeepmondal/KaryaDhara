
import Home from './components/landingpage/Land';
import Navbar from './components/Navbar';
import Particle from './components/Particle';

function App() {
  return (
    <div className="h-screen w-screen relative">
      <Navbar/>
      <Particle />
      <Home/>
    </div>

  );
}

export default App;
