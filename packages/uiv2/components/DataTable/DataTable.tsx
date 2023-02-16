import { Stack } from "../../base/Stack";
import { datatableRow, datatableValue } from "./DataTable.css";

export type KeyValue = {
  label: string;
  value: string;
};
type DataTableProps = {
  data: KeyValue[];
};
export const DataTable = (props: DataTableProps) => {
  return (
    <Stack space="12px">
      {props.data.map((item) => {
        return (
          <div key={item.label} className={datatableRow}>
            <div>{item.label}</div>{" "}
            <div className={datatableValue}>{item.value}</div>
          </div>
        );
      })}
    </Stack>
  );
};
