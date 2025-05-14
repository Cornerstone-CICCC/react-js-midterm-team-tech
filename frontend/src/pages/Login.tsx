import {motion} from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const text = "LOGIN"

const container = {
  hidden: { opacitity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1,  y: 0}
}

const formVariant = {
  hidden: {opacity: 0, y: 50},
  visible:  { opacity: 1, y: 0 },
  transition: {
    delay: 1, duration: 0.6
  },
}

function Login () {
  const [animation, setAnimation] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prev) => prev + 1)
    }, 5000)
    return() => clearInterval(interval)
  })


   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <motion.h1
    key={animation}
    variants={container}
    initial="hidden"
    animate="visible"
    className='text-[10vw] font-extrabold text-black flex mb-8'
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child} > 
        {char}

        </motion.span>
      ))}
    </motion.h1>


    
    </div>
  )
}

export default Login