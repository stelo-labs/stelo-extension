import React from "react";

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  declare type Children = { children?: React.ReactNode };
  declare type FC<T = {}> = React.FC<Children & T>;
}
