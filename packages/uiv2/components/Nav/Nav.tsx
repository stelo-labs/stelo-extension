import { Row } from "../../base/Row";
import { useViewStore } from "../../store";
import Flag from "./Flag";
import Logo from "./logo";
import { button, navWrapper } from "./Nav.css";
import Share from "./Share";

type NavProps = {
  showControls?: boolean;
};

export const Nav = ({ showControls = false }: NavProps) => {
  const { setView } = useViewStore();
  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      className={navWrapper}
    >
      <Logo></Logo>
      <Row gap="12px">
        {/* <button className={button}>
          <Share />
        </button> */}

        {showControls && (
          <button className={button} onClick={() => setView("REPORT")}>
            <Flag />
          </button>
        )}
      </Row>
    </Row>
  );
};
