import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Box, BoxProps } from "../../layout/Box";
import { normalizeImageUrl } from "../../../utils/images";
import badImage from "../../../static/bad-image.svg";
import { media } from "./Media.css";
import ContentLoader from "react-content-loader";

type MediaProps = {
  src: string;
  ratio?: number;
  type?: "img" | "video/mp4" | "video/webm";
  isLoading?: boolean;
} & BoxProps;
// How do we mock this?
const useValidImage = (url: string) => {
  const [valid, setValid] = React.useState<boolean | undefined>();
  if (url === "") {
    return { loading: false, valid: false };
  }
  fetch(new Request(url, { method: "HEAD", mode: "no-cors" }))
    .then(function () {
      setValid(true);
    })
    .catch(function () {
      setValid(false);
    });
  return { loading: typeof valid == "undefined", valid };
};

export const Media = ({
  ratio = 1,
  type = "img",
  src,
  isLoading,
  ...boxProps
}: MediaProps) => {
  let normalizedUrl = normalizeImageUrl(src);
  const { valid, loading } = useValidImage(normalizedUrl);
  let mediaContent;

  if (typeof valid == "undefined" || loading || isLoading) {
    mediaContent = (
      <Box>
        <ContentLoader height="100" width="100">
          <rect height="100" width="100"></rect>
        </ContentLoader>
      </Box>
    );
  } else if (!valid) {
    mediaContent = <img className={media} src={badImage} />;
  } else if (type == "img") {
    mediaContent = <img className={media} src={normalizedUrl} />;
  } else if (type == "video/mp4" || type == "video/webm") {
    mediaContent = (
      <video className={media} loop={true} muted={true} autoPlay={true}>
        <source src={normalizedUrl} type={type}></source>
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  } else {
    mediaContent = <div>...</div>;
  }
  return (
    <Box overflow="hidden" {...boxProps}>
      <AspectRatio.Root ratio={ratio}>{mediaContent}</AspectRatio.Root>
    </Box>
  );
};
