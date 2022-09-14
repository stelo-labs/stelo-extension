import { isNull, isUndefined } from "lodash";

export const ethToUsd = (
  ethAmount: number | string | null | undefined,
  ethPriceInUsd: number | string | null | undefined
) => {
  if (ethAmount === 0) return 0;
  if (
    isNull(ethAmount) ||
    isNull(ethPriceInUsd) ||
    isUndefined(ethAmount) ||
    isUndefined(ethPriceInUsd)
  )
    return null;
  const _ethAmount = parseFloat(ethAmount.toString());
  const _ethPriceInUsd = parseFloat(ethPriceInUsd.toString());
  return _ethAmount * _ethPriceInUsd;
};
