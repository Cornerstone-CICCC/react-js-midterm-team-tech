import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import ServiceList from './pages/ServiceList';

function App() {
  return (
    <Routes>
      {/* this is test for testing the routing */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service-list" element={<ServiceList />} />
    </Routes>
  );
}

export default App;
