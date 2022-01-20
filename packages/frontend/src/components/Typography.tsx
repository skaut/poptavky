import styled from "@emotion/styled"
import { theme } from "../theme"

export const Article = styled("article")`
  margin: 0 0 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.brand}10;
`

export const Paragraph = styled("p")`
  margin: 0 0 16px;
`

export const Mark = styled("span")`
  display: flex;
  align-items: center;
  color: ${theme.colors.gray};
  font-size: 0.8em;
  svg {
    margin-right: 0.2em;
  }
`

export const H1 = styled("h1")`
  color: ${theme.colors.brand};
  margin: 0 0 16px;
  font-family: themix;
  font-size: 2em;
`

export const H2 = styled("h2")`
  color: ${theme.colors.brand};
  margin: 0 0 12px;
  font-family: themix;
`

export const H3 = styled("h3")`
  color: ${theme.colors.brand};
  margin: 0 0 12px;
  font-family: themix;
`

export const SmallLink = styled("span")`
  a {
    display: block;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const LargeParagraph = styled(Paragraph)`
  font-size: 18px;
  margin: 0;
`
