import { getUrlFromIpfs, isIpfs } from "./ipfs";

export function normalizeImageUrl(imageUrl: string | undefined | null) {
  if (!imageUrl) {
    return undefined;
  }
  if (isIpfs(imageUrl)) {
    return getUrlFromIpfs(imageUrl);
  } else {
    return imageUrl;
  }
}

export const getLink = (img: any) => {
  //handle inconsistencies between vite and webpack image imports
  //@ts-ignore
  return img.src ? img.src : img;
};
