import { Stack } from "../../base/Stack";
import { Nav } from "../../components/Nav/Nav";
import { Main } from "../../layout/main";
import ErrorIllustration from "./ErrorIllustration";
import { fill } from "../ReportView/ReportView.css";
import { ErrorFooter } from "../../components/Footer/ErrorFooter";
import { ExtensionMetadata, useViewStore } from "../../store";
import { useEffect } from "react";

type TxErrorViewProps = {
  approve: () => void;
  reject: () => void;
  errorMessage: string;
  extensionMetadata: ExtensionMetadata;
};

export const SharedErrorView = () => (
  <Stack alignItems="center" className={fill}>
    <ErrorIllustration />
  </Stack>
);

export const ErrorView = () => {
  const { createEvent } = useViewStore(({ createEvent }) => ({ createEvent }));
  useEffect(() => {
    createEvent("ERROR");
  }, []);
  return <SharedErrorView />;
};

export const ErrorLayout = ({
  approve,
  reject,
  errorMessage,
  extensionMetadata,
}: TxErrorViewProps) => {
  const { createEvent } = useViewStore(({ createEvent }) => ({
    createEvent,
  }));
  const error = { runtimeError: errorMessage };
  useEffect(() => {
    createEvent("ERROR", error, extensionMetadata);
  }, []);
  return (
    <Main
      nav={<Nav></Nav>}
      footer={
        <ErrorFooter
          onContinue={() => {
            createEvent("ERROR_APPROVED", error);
            approve();
          }}
          onReject={() => {
            createEvent("ERROR_REJECTED", error);
            reject();
          }}
        />
      }
      mode="EXT"
    >
      <SharedErrorView />
    </Main>
  );
};
