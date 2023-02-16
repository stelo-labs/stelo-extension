import clsx from "clsx";
import React from "react";
import { Mode } from "../App";
import { useRisk, useViewStore } from "../store";
import {
  content,
  embedFooterPosition,
  extFooterPosition,
  mainLayout,
} from "./main.css";
import { useTrackHeight } from "./trackHeight";

type MainProps = {
  footer?: React.ReactNode;
  nav?: React.ReactNode;
  mode: Mode;
};

/**
 * Icon
 */

export const Main = React.forwardRef<HTMLDivElement, MainProps & Children>(
  ({ nav, children, footer, mode }, ref) => {
    const { height: footerHeight, ref: footerRef } = useTrackHeight();
    const { height: navHeight, ref: navRef } = useTrackHeight();
    const { isFooterExpanded } = useViewStore(({ isFooterExpanded }) => ({
      isFooterExpanded,
    }));
    const risk = useRisk();
    const isHighRisk = risk?.riskScore === "HIGH";
    const renderHighRiskTakeover = isFooterExpanded && isHighRisk;

    // maxHeight preserves scrolling on very tiny screens
    const footerStyle = renderHighRiskTakeover
      ? {
          maxHeight: `calc(100vh - ${navHeight}px)`,
        }
      : { maxHeight: `calc(100vh - ${navHeight}px)` };

    return (
      <div className={mainLayout} id="stelo_ext_root">
        <nav ref={navRef}>{nav}</nav>
        <div className={content}>
          {children}
          {/* Whitespace offset for scrolling, otherwise footer cuts off main content*/}
          {/* Need to set inline w/ runtime value */}
        </div>
        <div style={{ height: footerHeight }}></div>

        <div
          style={footerStyle}
          className={clsx(
            mode === "EMBED" && embedFooterPosition,
            mode === "EXT" && extFooterPosition
          )}
          ref={footerRef}
        >
          {footer}
        </div>
      </div>
    );
  }
);

Main.displayName = "MainLayout";
