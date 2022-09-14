import { BigNumber, BigNumberish } from "ethers";

export const toReadableNumber = (tokenId: BigNumberish | undefined | null) => {
  if (!tokenId) {
    return "N/A";
  } else {
    return BigNumber.from(tokenId).toString();
  }
};

export function excludeNull<T>(arr: (T | null)[]) {
  return arr.flatMap((x) => (!!x ? [x] : []));
}
