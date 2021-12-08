/** @jsxImportSource @emotion/react */
import React from "react"
import styled from "@emotion/styled"
import { Global } from "@emotion/react"
import logo from "./images/logo.svg"
import { theme } from "./theme"
import { globalStyles } from "./globalStyles"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import { IssuesList } from "./pages/IssuesList/IssuesList"
import { IssueDetail } from "./pages/IssueDetail/IssueDetail"
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail"
import { ProjectsList } from "./pages/ProjectsList/ProjectsList"
import { Navigation } from "./components/Navigation"
import { ScrollToTop } from "./components/ScrollToTop"


export const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Global styles={globalStyles} />
        <Link to="/" title="domů">
          <Header>
            <Logo src={logo} alt="logo" />
            <Title>IT poptávky</Title>
          </Header>
        </Link>
        <main>
          <ScrollToTop />
          <Switch>
            <Route path={["/", "/projekty"]} exact>
              <Navigation items={[
                {
                  title: "Poptávky",
                  link: "/"
                },
                {
                  title: "Projekty",
                  link: "/projekty"
                }
              ]} />
            </Route>
          </Switch>
          <Switch>
            <Route path="/projekty">
              <ProjectsList />
            </Route>
            <Route path="/:owner/:project/:issue" component={IssueDetail} />
            <Route path="/:owner/:project" component={ProjectDetail}/>
            <Route path="/" component={IssuesList} />
          </Switch>
        </main>
      </Container>
    </Router>
  )
}

const Container = styled("div")`
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
  max-height: 100%
`
