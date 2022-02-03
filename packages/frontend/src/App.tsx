/** @jsxImportSource @emotion/react */
import React from "react"
import styled from "@emotion/styled"
import { Global } from "@emotion/react"
import useSWR from "swr"
import logo from "./images/logo.svg"
import { theme } from "./theme"
import { globalStyles } from "./globalStyles"
import { Link, Route, Switch } from "react-router-dom"
import { IssuesList } from "./pages/IssuesList/IssuesList"
import { IssueDetail } from "./pages/IssueDetail/IssueDetail"
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail"
import { ProjectsList } from "./pages/ProjectsList/ProjectsList"
import { Navigation } from "./components/Navigation"
import { ScrollToTop } from "./components/ScrollToTop"
import { config } from "./config"

export const App: React.FC = () => {
  const { data, error } = useSWR(config.dataApiUrl, async (...args) => {
    const res = await fetch(...args)
    return res.json()
  })
  if (error) {
    return <div>Nepodařilo se načíst data webu.</div>
  }
  if (!data) {
    return <div>Načítají se data webu.</div>
  }
  return (
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
              <Navigation
                items={[
                  {
                    title: "Poptávky",
                    link: "/",
                  },
                  {
                    title: "Projekty",
                    link: "/projekty",
                  },
                ]}
              />
            </Route>
          </Switch>
          <Switch>
            <Route
              path="/projekty"
              render={(props) => <ProjectsList {...props} data={data} />}
            />
            <Route
              path="/:owner/:project/:issue"
              render={(props) => <IssueDetail {...props} data={data} />}
            />
            <Route
              path="/:owner/:project"
              render={(props) => <ProjectDetail {...props} data={data} />}
            />
            <Route
              path="/"
              render={(props) => <IssuesList {...props} data={data} />}
            />
          </Switch>
        </main>
      </Container>
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
  max-height: 100%;
`
