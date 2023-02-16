import LogStore from "./LogStore";

let isDev = false;

try {
  // Check for development flag in Vite environment
  //@ts-ignore
  isDev = import.meta.env.DEV;
} catch (err) {}
try {
  // if no development flag from Vite, check for flag in webpack environment
  //@ts-ignore
  isDev = !isDev && process?.env?.NODE_ENV === "development";
} catch (err) {}

export const log = (...args: unknown[]) => {
  LogStore.push(...args);
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(
      "%c [STELO] >>>>>>>>> ",
      "background: #222; color: #bada55",
      ...args
    );
  }
};
