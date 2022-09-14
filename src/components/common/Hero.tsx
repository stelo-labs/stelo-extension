import { Box } from "../layout/Box";
import { Text } from "../layout/Text";

import { Card, Separator } from "../layout/Card";
import { SkeletonCardContent } from "./Skeleton";
import { Media } from "./Media";
import { DappInfo } from "./DappInfo";

type HeroProps = {
  loading?: boolean;
  LoadingContent?: JSX.Element;
  BodyContent?: JSX.Element;
  header: string;
  subheader?: string | JSX.Element;
  methodName?: string;
  images?: string[] | undefined;
};

export const Hero = ({
  loading = false,
  LoadingContent = <SkeletonCardContent></SkeletonCardContent>,
  BodyContent,
  header,
  subheader,
  methodName,
  images,
}: HeroProps) => {
  const hasImages = !!images?.length;

  return (
    <Card padding="2x" marginTop={hasImages ? "5x" : undefined} width="full">
      {loading ? (
        LoadingContent
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              marginLeft: "75px",
            }}
          >
            {/* TODO (scharf): handle cases where we have more elements than we can show.
            Probably abstract this img element to stiches component */}
            {!!images &&
              images.map((img) => (
                <Box
                  key={img}
                  marginTop="-8x"
                  display="flex"
                  justifyContent="center"
                >
                  <Media
                    style={{
                      borderRadius: "24px",
                      filter: "drop-shadow(1px 0px 4px rgba(0, 0, 0, 0.45))",
                      marginLeft: "-75px",
                      height: "100px",
                      width: "100px",
                    }}
                    src={img}
                  />
                </Box>
              ))}
          </div>
          <Box marginY="5x" paddingY="0x">
            <Text size="32" weight={700} textAlign="center">
              {header}
            </Text>
            <Text size="32" weight={700} textAlign="center">
              {subheader}
            </Text>
            {methodName && (
              <Box display="flex" justifyContent={"center"}>
                <Box
                  fontSize="32"
                  fontWeight={700}
                  textAlign="center"
                  width="fit"
                  minWidth="2/3"
                  background={!!methodName ? "gray300" : "white"}
                  color="white"
                  paddingX="4x"
                  paddingY="0x"
                  marginTop="5x"
                  borderRadius="10"
                >
                  {methodName}
                </Box>
              </Box>
            )}
          </Box>
          {BodyContent && (
            <>
              <Separator />
              {BodyContent}
            </>
          )}
          <Separator />
          <Box>
            <DappInfo />
          </Box>
        </>
      )}
    </Card>
  );
};
