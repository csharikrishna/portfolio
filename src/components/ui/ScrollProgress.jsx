import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   return (
      <motion.div
         style={{
            scaleX,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #f472b6 100%)",
            transformOrigin: "0%",
            zIndex: 1000,
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
         }}
      />
   );
};

export default ScrollProgress;
