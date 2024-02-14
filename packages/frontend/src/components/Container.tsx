import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import type React from "react";
import { Link, Outlet } from "react-router-dom";

import { globalStyles } from "../globalStyles";
import logo from "../images/logo.svg";
import { theme } from "../theme";
import { ScrollToTop } from "./ScrollToTop";

const WrapperDiv = styled("div")`
  max-width: ${theme.layout.width}px;
  padding: 0 16px;
  margin: 0 auto;
`;

const Header = styled("header")`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 auto;
  padding: 16px 0;
`;

const Logo = styled("img")`
  max-height: 100%;
`;

const Title = styled("h1")`
  font-family: themix;
  font-size: 20px;
  margin: 0 0 0 24px;
`;

export const Container = (): React.JSX.Element => (
  <WrapperDiv>
    <Global styles={globalStyles} />
    <Link title="domů" to="/">
      <Header>
        <Logo alt="logo" src={logo} />
        <Title>IT poptávky</Title>
      </Header>
    </Link>
    <main>
      <ScrollToTop />
      <Outlet />
    </main>
  </WrapperDiv>
);
