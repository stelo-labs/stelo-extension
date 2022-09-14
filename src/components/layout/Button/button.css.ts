import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { sprinkles } from "../../../css/sprinkles.css";

export const button = recipe({
  base: [
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .1s ease-in-out",
      fontWeight: "600",
      borderRadius: 10000,
      ":active": {
        transform: "scale(.96)",
      },
    },
  ],
  variants: {
    size: {
      fit: sprinkles({
        width: "fit",
        paddingY: "4x",
        paddingX: "5x",
      }),
      sm: sprinkles({
        paddingX: "6x",
        paddingY: "5x",
        minWidth: "1/5",
      }),
      md: sprinkles({
        paddingY: "2x",
        paddingX: "3x",
        minWidth: "1/4",
      }),
      lg: sprinkles({
        paddingY: "2x",
        paddingX: "3x",
        minWidth: "1/4",
      }),
      xl: sprinkles({
        padding: "7x",
      }),
    },
    color: {
      primary: sprinkles({
        color: "black",
        borderStyle: "solid",
        borderWidth: "1",
        borderColor: "black",
        background: "primary",
      }),
      secondary: sprinkles({
        color: "white",
        background: "black",
        borderStyle: "none",
      }),
      tertiary: sprinkles({
        color: "black",
      }),
      destructive: sprinkles({
        color: "black",
        background: "report",
        borderWidth: "1",
        borderColor: "black",
      }),
      disabled: [
        sprinkles({
          borderStyle: "solid",
          color: "gray500",
          background: "gray200",
        }),
        {
          textDecoration: "line-through",
          ":active": {
            transform: "scale(1)",
          },
        },
      ],
    },
  },

  defaultVariants: {
    color: "primary",
    size: "fit",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
