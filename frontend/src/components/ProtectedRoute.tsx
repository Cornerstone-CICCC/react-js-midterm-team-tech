// import { Navigate } from 'react-router-dom';
// import { useEffect, useState, type JSX } from 'react';

// // Utility to check if user is authenticated by checking cookie (simple check)
// function isAuthenticated() {
//   // Check if JWT cookie exists (simple, not perfect)
//   return document.cookie.split(';').some(c => c.trim().startsWith('token='));
// }

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const [auth, setAuth] = useState<boolean | null>(null);

//   useEffect(() => {
//     setAuth(isAuthenticated());
//   }, []);

//   if (auth === null) return null; // or loading spinner
//   if (!auth) return <Navigate to="/signin" replace />;
//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useEffect, useState, type JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  console.log('ProtectedRoute');
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
      credentials: 'include',
    })
      .then(res => (res.ok ? setAuth(true) : setAuth(false)))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return null; // or loading spinner
  if (!auth) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
