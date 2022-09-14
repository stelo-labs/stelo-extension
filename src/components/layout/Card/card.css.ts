import { keyframes, style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { sprinkles } from "../../../css/sprinkles.css";

const slideUp = keyframes({
  "0%": { transform: "translateY(10%)" },
  "100%": { transform: "translateY(0)" },
});

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const cardClass = style({
  animation: `${slideUp} 500ms cubic-bezier(.15,1.15,0.6,1.00), ${fadeIn} 150ms ease`,
  maxWidth: "100vw",
});

export const cardrow = recipe({
  base: {},
  variants: {
    layout: {
      standard: {},
      inverted: {},
    },
  },
  defaultVariants: { layout: "standard" },
});

export const cardrowtext = recipe({
  variants: {
    layout: {
      standard: {},
      inverted: sprinkles({ color: "gray500", fontSize: "12" }),
    },
  },
  defaultVariants: { layout: "standard" },
});

export const cardrowsubtext = recipe({
  base: {},
  variants: {
    layout: {
      standard: sprinkles({ color: "gray500", fontSize: "12" }),
      inverted: {},
    },
  },
  defaultVariants: { layout: "standard" },
});

// Get the type
export type CardRowVariants = NonNullable<RecipeVariants<typeof cardrow>>;
