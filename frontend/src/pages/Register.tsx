import {motion} from 'framer-motion'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const text = "REGISTER";


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};



const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



const formVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.6 } },
};

function Register() {
  const [animation, setAnimation] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);




    return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* My animation heading */}
      <motion.h1
        key={animation}
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-[10vw] font-extrabold text-black flex mb-8"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={child}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {/* the nnimated Form */}
      <motion.form
        variants={formVariant}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg space-y-6"
      >
          <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="John"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>



        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>



        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>



        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-black text-white rounded-full font-semibold transition duration-300"
        >
          Create Account
        </motion.button>

        <div className="text-center pt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="text-sm text-gray-600 hover:underline hover:text-black transition-colors"
          >
            Already have an account? <strong>Login</strong>
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default Register