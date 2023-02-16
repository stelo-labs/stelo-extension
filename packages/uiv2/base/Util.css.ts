import { keyframes, style } from "@vanilla-extract/css";
const fadeInAnimation = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const fadeIn = style({
  animation: `${fadeInAnimation} .3s ease-in`,
  animationFillMode: "forwards",
  opacity: 0,
  animationDelay: "150ms",
});
