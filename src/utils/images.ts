import { getUrlFromIpfs, isIpfs } from "./ipfs";

export function normalizeImageUrl(imageUrl: string) {
  if (isIpfs(imageUrl)) {
    return getUrlFromIpfs(imageUrl);
  } else {
    return imageUrl;
  }
}
