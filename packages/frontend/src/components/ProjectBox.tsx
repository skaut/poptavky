import styled from "@emotion/styled"
import { theme } from "../theme"

export const ProjectBox = styled("div")`
  color: white;
  background-color: ${theme.colors.brand};
  margin-left: -10px;
  margin-right: -10px;
  padding: 20px;
  border-radius: 10px;
  * {
    color: white;
  }
  *::selection {
    background-color: white;
    color: ${theme.colors.brand};
  }
`
