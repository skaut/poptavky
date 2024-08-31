/** @jsxImportSource @emotion/react */
import type React from "react";

import { css } from "@emotion/react";

export interface LinkProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly href: string;
  readonly targetSelf?: boolean;
  readonly title?: string;
}
export const ExtLink = ({
  children,
  href,
  title = undefined,
  targetSelf = false,
  className = undefined,
}: LinkProps): React.JSX.Element => (
  <a
    className={className}
    href={href}
    title={title}
    {...(!targetSelf
      ? {
          target: "_blank",
          rel: "noreferrer noopener",
        }
      : {})}
    css={css`
      display: inline-flex;
      align-items: center;
    `}
  >
    {children}
  </a>
);
