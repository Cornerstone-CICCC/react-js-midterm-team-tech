import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      {/* this is test for testing the routing */}
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
