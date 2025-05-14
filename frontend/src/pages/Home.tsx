import { Link } from 'react-router-dom';

// this is test component for testing the routing
function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <h1 className="text-4xl font-bold mb-4 text-pink-700">
        Welcome to the Rental Girlfriend Service
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        Find the perfect partner for you.
      </p>
      <Link
        to="/signin"
        className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
      >
        Sign In / Login Here
      </Link>
    </div>
  );
}
export default Home;
