import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import { Heart } from 'lucide-react';


function getRandomStyles() {
  return {
    fontSize: `${20 + Math.random() * 24}px`,
    top: `${Math.random() < 0.5 ? Math.random() * 30 : 70 + Math.random() * 30}%`, // this keep hearts off the center i hope
    left: `${Math.random() * 100}%`,
    zIndex: 0,
    opacity: 0.15 + Math.random() * 0.2,
    filter: 'blur(1.5px)',
  };
}
// this is test component for testing the routing
function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center overflow-hidden">
      {/* Aurora Gradient Animation  Will End up head*/}
      <div className="absolute inset-0 z-0 animate-aurora bg-[radial-gradient(circle_at_30%_30%,rgba(255,192,203,0.4),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,182,193,0.3),transparent_60%)]" />

      {/* this is my floating Hearts imojis */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => {
          const styles = getRandomStyles();
          return (
            <motion.div
              key={i}
              className="absolute text-pink-400"
              style={styles}
              animate={{
                y: [0, -30 - Math.random() * 30, 0],
                x: [0, Math.random() * 10 - 5, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random(),
              }}
              whileHover={{ scale: 1.5, opacity: 1 }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          );
        })}
      </div>

      {/* this will animated the Title & Text */}
      <motion.div
        className="z-10 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      > 
        <motion.h1
          className="text-5xl font-extrabold text-pink-700 drop-shadow mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to <br /> Rental Girlfriend Service
        </motion.h1>

        <motion.p
          className="text-lg text-gray-800 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Find The Perfect Partner For You
        </motion.p>

        {/* Im trying to edit the button*/}
        <motion.div
          className="relative inline-block"
          whileHover={{
            scale: 1.08,
            boxShadow: '0px 12px 30px rgba(236, 72, 153, 0.5)',
          }}
          whileTap={{
            scale: 0.95,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
          }}
        >

          <motion.span
            className="absolute inset-0 rounded-full bg-pink-300 opacity-30"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{
              scale: 2,
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeOut' },
            }}
          />
          <Link to="/signin">
            <Button className="relative z-10 px-8 py-4 text-lg bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-xl transition-all duration-300">
              Sign In / Login Here
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
export default Home;
