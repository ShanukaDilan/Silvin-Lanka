"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

type AnimatedSectionProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    width?: "full" | "100%";
    variant?: "fade-up" | "fade-in" | "scale-up";
};

export const AnimatedSection = ({
    children,
    className = "",
    delay = 0,
    width = "100%",
    variant = "fade-up",
}: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants: Record<string, Variants> = {
        "fade-up": {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay } },
        },
        "fade-in": {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay } },
        },
        "scale-up": {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay } },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[variant]}
            className={className}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};
