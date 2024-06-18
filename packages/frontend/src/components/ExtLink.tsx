/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type React from "react";

export interface LinkProps {
  readonly children: React.ReactNode;
  readonly href: string;
  readonly title?: string;
  readonly targetSelf?: boolean;
  readonly className?: string;
}
export const ExtLink = ({
  children,
  href,
  title,
  targetSelf,
  className,
}: LinkProps): React.JSX.Element => (
  <a
    className={className}
    href={href}
    title={title}
    {...(targetSelf !== true
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

ExtLink.defaultProps = {
  className: undefined,
  targetSelf: false,
  title: undefined,
};
