import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

import { theme } from "../theme"

interface NavigationItem {
  title: string
  link: string
  isActive?: boolean
}

export const Navigation = ({ items }: { items: NavigationItem[] }) => (
  <nav>
    <Container>
      {items.map((item, index) => (
        <NavigationLink key={index} to={item.link} end>
          {item.title}
        </NavigationLink>
      ))}
    </Container>
  </nav>
)

const Container = styled("div")`
  list-style: none;
  display: flex;
  margin-bottom: 24px;
  padding: 0 16px;
  border-bottom: 1px solid ${theme.colors.brand};
`

const NavigationLink = styled(NavLink)`
  display: block;
  padding: 0.2em 0.8em;
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-radius: 5px 5px 0 0;

  &.active {
    border-top: 1px solid ${theme.colors.brand};
    border-right: 1px solid ${theme.colors.brand};
    border-left: 1px solid ${theme.colors.brand};
    background-color: #fff;
  }
`
