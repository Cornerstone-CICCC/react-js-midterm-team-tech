import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import Logo from "../assets/LOGO.png"




const Header = () => {
  const userId = '123'; //Koya this is where the user prfile id will go.

  return (
    <header className="relative z-50 w-full">
      <div className="absolute inset-0 h-20 bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_70%)] blur-2xl pointer-events-none" />

      <div className="relative bg-transparent px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Heart Logo"
            className="w-7 h-7 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        <Link
          to={`/profile/${userId}`}
          className="text-black-500 hover:text-pink-600 transition duration-300"
        >
          <UserCircle className="w-8 h-8" />
        </Link>
      </div>
    </header>
  );
}

export default Header