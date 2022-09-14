import { modularScale } from "polished";
const createScale = (ratio: number, base: number) => (steps: number) =>
  `${modularScale(steps, base, ratio)}px`;
const negateScale = (func: (steps: number) => string) => (steps: number) =>
  `-${func(steps)}`;

const spaceScale = createScale(1.4, 4);
const negativeSpaceScale = negateScale(spaceScale);

export const space = {
  "0x": spaceScale(0),
  "1x": spaceScale(1),
  "2x": spaceScale(2),
  "3x": spaceScale(3),
  "4x": spaceScale(4),
  "5x": spaceScale(5),
  "6x": spaceScale(6),
  "7x": spaceScale(7),
  "8x": spaceScale(8),
  "9x": spaceScale(9),
  "10x": spaceScale(10),
  "11x": spaceScale(11),
  "12x": spaceScale(12),
};
export const negativeSpace = {
  "-0x": negativeSpaceScale(0),
  "-1x": negativeSpaceScale(1),
  "-2x": negativeSpaceScale(2),
  "-3x": negativeSpaceScale(3),
  "-4x": negativeSpaceScale(4),
  "-5x": negativeSpaceScale(5),
  "-6x": negativeSpaceScale(6),
  "-7x": negativeSpaceScale(7),
  "-8x": negativeSpaceScale(8),
  "-9x": negativeSpaceScale(9),
  "-10x": negativeSpaceScale(10),
  "-11x": negativeSpaceScale(11),
  "-12x": negativeSpaceScale(12),
};

const spaceToNegativeSpace: Record<
  keyof typeof space,
  keyof typeof negativeSpace
> = {
  "0x": "-0x",
  "1x": "-1x",
  "2x": "-2x",
  "3x": "-3x",
  "4x": "-4x",
  "5x": "-5x",
  "6x": "-6x",
  "7x": "-7x",
  "8x": "-8x",
  "9x": "-9x",
  "10x": "-10x",
  "11x": "-11x",
  "12x": "-12x",
};

type CustomSpace = { custom: number };
export type Space = keyof typeof space;
export type NegativeSpace = keyof typeof negativeSpace;

export function negateSpace(space: Space): NegativeSpace {
  return spaceToNegativeSpace[space];
}
