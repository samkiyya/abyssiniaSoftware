"use client";

import React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function InteractiveHorizontalScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wrappedChildren = React.Children.map(children, (child, index) => (
    <AnimatedHorizontalDiv key={index}>{child}</AnimatedHorizontalDiv>
  ));

  return <div className="min-h-screen flex gap-8">{wrappedChildren}</div>;
}

const AnimatedHorizontalDiv: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
    hidden: { opacity: 0, x: -50 }, // Start from left
    visible: {
      opacity: 1,
      x: 0, // Move to the center
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="bg-white min-w-[300px] flex-shrink-0"
    >
      {children}
    </motion.div>
  );
};
