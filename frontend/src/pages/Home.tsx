import image from "../assets/backgroundImg.png"
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// this is test component for testing the routing


const  text = "HELLO"
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


 function Home() {
   const [animation, setAnimation] = useState(0);
   const navigate = useNavigate()

  // This will Loop the animation In every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white space-y-10">
      <motion.h1
        key={animation}
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-[12vw] font-extrabold text-black flex"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={child}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

    <img src={image} alt="backgroundImg"  className="w-70 h-auto mb-10"/>

    <div className="flex gap-4">
  <button onClick={() => navigate('/register')} className="text-lg font-medium text-black border-2 border-black cursor-pointer  px-12 py-4 rounded-full relative overflow-hidden group flex items-center gap-4">
  {/* I put the background fill effect */}
  <span className="absolute left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full top-0 z-0"></span>

  <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">REGISTER</span>

  {/* where the arrow Icon goes */}
  <svg
    className="w-5 h-5 relative z-10 text-black group-hover:text-white transition-colors  transform translate-x-0 group-hover:translate-x-1 ease-in-out duration-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>






     <button onClick={() => navigate('/login')} className="text-lg font-medium text-black border-2 border-black px-12 py-4 rounded-full hover:text-white group relative flex items-center gap-3 overflow-hidden cursor-pointer">
  {/* where the background is fill */}
  <span className="absolute left-0 w-full h-0 transition-all bg-black opacity-100 group-hover:h-full group-hover:top-0 duration-300 ease-in-out z-0"></span>

 
  <span className="relative z-10">SIGN IN</span>

  {/* Where My Login Icon is gonna go */}
  <svg
    className="w-5 h-5 relative z-10 text-black group-hover:text-white transition-all duration-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0l4-4m-4 4l4 4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 4v16" />
  </svg>
</button>

    </div>
  </div>


  )
}
export default Home;
