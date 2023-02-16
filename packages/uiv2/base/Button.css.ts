import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { themeVars } from "../css/themeContract.css";

export const button = recipe({
  base: [
    {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .1s ease-in-out",
      fontWeight: "500",
      borderRadius: 10000,
      fontSize: "16px",
      flexGrow: 1,
      ":active": {
        transform: "scale(.96)",
      },
    },
  ],
  variants: {
    size: {
      md: {
        padding: "18px",
      },
    },
    color: {
      primary: {
        backgroundColor: themeVars.color.black,
        color: themeVars.color.white,
        outline: "transparent",
        border: "none",
      },
      secondary: {
        backgroundColor: themeVars.color.white,
        color: themeVars.color.black,
        outline: "transparent",
        border: ".5px solid rgba(33, 35, 38, 0.1);",
      },
    },
  },

  defaultVariants: {},
});

export type ButtonVariants = RecipeVariants<typeof button>;
