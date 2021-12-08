/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface LinkProps {
  href?: string
  title?: string
  targetSelf?: true
  className?: string
}
export const ExtLink: React.FC<LinkProps> = ({children, href, title, targetSelf, className}) => (
  <a
    className={className}
    href={href}
    title={title}
    {...(!targetSelf ? {
      target: "_blank",
      rel: "noreferrer noopener"
    } : {})}
    css={css`
      display: inline-flex;
      align-items: center;
    `}
  >
    {children}
  </a>
)