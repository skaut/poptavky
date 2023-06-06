import styled from "@emotion/styled"
import { theme } from "../theme"
import { ExtLink, LinkProps } from "./ExtLink"

export const Button = (props: LinkProps) => <ButtonWrapper {...props} />

const ButtonWrapper = styled(ExtLink)`
  display: inline-block;
  font-size: 1.2rem;
  background-color: ${theme.colors.brand};
  color: white;
  margin-top: 0.2rem;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  box-shadow: 0 0 0 ${theme.colors.gray};
  transition: box-shadow 300ms;
`
