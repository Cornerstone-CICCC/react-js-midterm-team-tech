import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ServiceList from './pages/ServiceList';
import Admin from './pages/Admin';
import UserProfilePage from './pages/Profile';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import MainLayout from './components/MainLayout';



function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route
        path="/service-list"
        element={
          // <ProtectedRoute>
          <ServiceList />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          // <ProtectedRoute>
          <Admin />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          // <ProtectedRoute>
          <UserProfilePage />
          // </ProtectedRoute>
        }
      />
      </Route>
    </Routes>
    
  );
}

export default App;
