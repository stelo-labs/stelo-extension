import { Row } from "../../base/Row";
import { Stack } from "../../base/Stack";
import { truncateAddress } from "utils";
import {
  typedDataValue,
  typedDataLabel,
  nestedContainer,
  objectTitle,
  arrayNode,
} from "./TypedData.css";

const getDepthClassName = (depth: number) => {
  return depth > 0 ? nestedContainer : "";
};

const getLengthDescriptor = (length: number) => {
  return length === 1 ? `${length} item` : `${length} items`;
};

const isPrimitive = (value: any) => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
};

const isHex = (value: string) => {
  return value.startsWith("0x");
};

const NodeWalker = ({
  label,
  value,
  depth,
}: {
  label: string;
  value: any;
  depth: number;
}) => {
  if (Array.isArray(value)) {
    return <ArrayNode label={label} value={value} depth={depth} />;
  } else if (isPrimitive(value)) {
    return <PrimitiveNode label={label} value={value} />;
  } else {
    return <ObjectNode label={label} value={value} depth={depth} />;
  }
};

const ArrayNode = ({
  label,
  value,
  depth,
}: {
  label: string;
  value: any[];
  depth: number;
}) => {
  return (
    <div>
      <PrimitiveNode
        label={label}
        value={getLengthDescriptor(value.length)}
      ></PrimitiveNode>
      <Stack space="20px" className={arrayNode}>
        {value.map((item, idx) => (
          <div className={getDepthClassName(depth)}>
            <NodeWalker
              label=""
              key={idx}
              value={item}
              depth={depth + 1}
            ></NodeWalker>
          </div>
        ))}
      </Stack>
    </div>
  );
};

const ObjectNode = ({
  label,
  value,
  depth,
}: {
  label?: string;
  value: Record<string, any>;
  depth: number;
}) => {
  const tuples = Object.entries(value);
  return (
    <div>
      {label && (
        <PrimitiveNode
          label={label}
          value={""}
          className={objectTitle}
        ></PrimitiveNode>
      )}
      <Stack space="6px" className={getDepthClassName(depth)}>
        {tuples.map(([childLabel, childValue], idx) => {
          return (
            <NodeWalker
              key={idx}
              label={childLabel}
              value={childValue}
              depth={depth + 1}
            ></NodeWalker>
          );
        })}
      </Stack>
    </div>
  );
};

const PrimitiveNode = ({
  label,
  value,
  className,
}: {
  label: string;
  value: any;
  className?: string;
}) => {
  const valueRender = isHex(value) ? <HexNode value={value}></HexNode> : value;

  return (
    <Row justifyContent="space-between" className={className}>
      <div className={typedDataLabel}>{label}</div>
      <div className={typedDataValue}>{valueRender}</div>
    </Row>
  );
};

const HexNode = ({ value }: { value: string }) => {
  return <span>{truncateAddress(value)}</span>;
};

export const TypedDataView = ({ data }: { data: any }) => {
  return (
    <div>
      <NodeWalker label="" value={data} depth={0}></NodeWalker>
    </div>
  );
};
