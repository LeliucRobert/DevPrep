import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0, // Start fully transparent
  },
  in: {
    opacity: 1, // Fade to fully visible
  },
  out: {
    opacity: 0, // Fade back to fully transparent
  },
};

const pageTransition = {
  duration: 0.1, // Adjust the duration to control speed
  ease: "easeInOut", // Smoother ease for fade effect
};

const AnimatedPage = (Component) => {
  return (props) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Component {...props} />
    </motion.div>
  );
};

export default AnimatedPage;
