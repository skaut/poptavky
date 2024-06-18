/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { theme } from "./theme";

export const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
  }

  a {
    color: ${theme.colors.brand};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ::selection {
    background-color: ${theme.colors.brand};
    color: white;
  }
`;
