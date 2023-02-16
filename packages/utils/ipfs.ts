//ipfs://QmNTGsViF8tQKiGyJJ9395zpYZTSdZUeBT8C39jSosaRZj/2589.png
export const isIpfs = (url: string) => {
  return url.indexOf("ipfs://") == 0;
};

export const getUrlFromIpfs = (ipfsURL: string) => {
  let url = ipfsURL.replace(/^ipfs:\/\/?/, "ipfs/");
  url = "https://gateway.ipfs.io/" + url;
  return url;
};
