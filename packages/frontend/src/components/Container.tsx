import React from "react"
import styled from "@emotion/styled"
import { Global } from "@emotion/react"
import logo from "../images/logo.svg"
import { theme } from "../theme"
import { globalStyles } from "../globalStyles"
import { Link, Outlet } from "react-router-dom"
import { ScrollToTop } from "./ScrollToTop"

export const Container: React.FC = () => (
  <WrapperDiv>
    <Global styles={globalStyles} />
    <Link to="/" title="domů">
      <Header>
        <Logo src={logo} alt="logo" />
        <Title>IT poptávky</Title>
      </Header>
    </Link>
    <main>
      <ScrollToTop />
      <Outlet />
    </main>
  </WrapperDiv>
)

const WrapperDiv = styled("div")`
  max-width: ${theme.layout.width}px;
  padding: 0 16px;
  margin: 0 auto;
`

const Header = styled("header")`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 auto;
  padding: 16px 0;
`

const Title = styled("h1")`
  font-family: themix;
  font-size: 20px;
  margin: 0 0 0 24px;
`

const Logo = styled("img")`
  max-height: 100%;
`
