import { F } from "ts-toolbelt";

export const allSettled = async (...fns: F.Function<any, Promise<any>>[]) => {
  return Promise.allSettled(fns.map((f) => f()));
};
