import { Box } from "../../layout/Box";
import { CardContentPlaceholder } from "../../layout/Card";

export const PlaceholderSimulationSection = ({
  height,
}: {
  height: number;
}) => {
  return (
    <CardContentPlaceholder
      height={height}
      width={"100%"}
      viewport={`0 0 300 140`}
      rows={3}
    ></CardContentPlaceholder>
  );
};
