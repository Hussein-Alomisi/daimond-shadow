"use client";

/**
 * Thin "use client" wrappers around framer-motion primitives.
 * Import these in Server Components instead of using `motion.*` directly.
 * This keeps sections as Server Components while still animating on the client.
 */
import { motion } from "framer-motion";

export const MotionDiv     = motion.div;
export const MotionSection = motion.section;
export const MotionNav     = motion.nav;
export const MotionA       = motion.a;
