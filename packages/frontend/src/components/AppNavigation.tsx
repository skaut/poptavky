import type React from "react";

import { Navigation } from "./Navigation";

export const AppNavigation = (): React.JSX.Element => (
  <Navigation
    items={[
      {
        link: "/",
        title: "Poptávky",
      },
      {
        link: "/projekty",
        title: "Projekty",
      },
    ]}
  />
);
