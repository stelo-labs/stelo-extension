export const log = (...args: any[]) => {
  console.log(
    "%c [STELO] >>>>>>>>> ",
    "background: #222; color: #bada55",
    ...args
  );
};
