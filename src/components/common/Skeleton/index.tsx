import ContentLoader from "react-content-loader";
import { Card, CardContentPlaceholder, Separator } from "../../layout/Card";

export const Skeleton = () => {
  return (
    <Card>
      <SkeletonCardContent />
    </Card>
  );
};
export const SkeletonCardContent = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={"100%"}
        height="100"
        viewBox={`0 0 300 100`}
      >
        <rect x="30" y={20} rx="4" ry="4" width="240" height="30" />
        <rect x="40" y={60} rx="4" ry="4" width="220" height="25" />
      </ContentLoader>
      <Separator />
      <CardContentPlaceholder
        height={140}
        width={"100%"}
        viewport={`0 0 300 140`}
        rows={3}
      ></CardContentPlaceholder>
      <Separator />
      <ContentLoader
        speed={2}
        width={"100%"}
        height="64"
        viewBox={`0 0 300 64`}
      >
        <rect x="10" y="20" width="32" height="32"></rect>
        <rect x="48" y={20} rx="4" ry="4" width="160" height="12" />
        <rect x="48" y={40} rx="4" ry="4" width="160" height="12" />
      </ContentLoader>
    </>
  );
};
