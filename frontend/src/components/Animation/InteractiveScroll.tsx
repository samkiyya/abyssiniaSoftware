"use client";

import React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function InteractiveScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wrappedChildren = React.Children.map(children, (child, index) => (
    <AnimatedDiv key={index}>{child}</AnimatedDiv>
  ));

  return <div className="min-h-screen">{wrappedChildren}</div>;
}

const AnimatedDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0.5, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
