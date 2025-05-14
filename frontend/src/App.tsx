import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import ServiceList from './pages/ServiceList';
import Admin from './pages/Admin';
import UserProfilePage from './pages/Profile';

function App() {
  return (
    <Routes>
      {/* this is test for testing the routing */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service-list" element={<ServiceList />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile/:id" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;
