import { keyframes, style } from "@vanilla-extract/css";
const slideUp = keyframes({
  "0%": { transform: "translateY(10%)" },
  "100%": { transform: "translateY(0)" },
});
const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const enterAnimationClass = style({
  animation: `${slideUp} 150ms cubic-bezier(.15,1.15,0.6,1.00), ${fadeIn} 1000ms ease`,
});
