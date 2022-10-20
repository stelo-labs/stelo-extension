import LogStore from "./LogStore";
export const log = (...args: any[]) => {
  LogStore.push(...args);
  if (!import.meta.env.PROD) {
    console.log(
      "%c [STELO] >>>>>>>>> ",
      "background: #222; color: #bada55",
      ...args
    );
  }
};
