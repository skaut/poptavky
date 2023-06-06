/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export interface LinkProps {
  children?: React.ReactNode
  href?: string
  title?: string
  targetSelf?: true
  className?: string
}
export const ExtLink = ({
  children,
  href,
  title,
  targetSelf,
  className,
}: LinkProps) => (
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
)
