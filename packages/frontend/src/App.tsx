/** @jsxImportSource @emotion/react */
import type React from "react"
import { Route, Routes } from "react-router-dom"
import useSWR from "swr"

import { Container } from "./components/Container"
import { Navigation } from "./components/Navigation"
import { config } from "./config"
import type { ProjectListings } from "./interfaces/ProjectListings"
import { IssueDetail } from "./pages/IssueDetail/IssueDetail"
import { IssuesList } from "./pages/IssuesList/IssuesList"
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail"
import { ProjectsList } from "./pages/ProjectsList/ProjectsList"

const AppNavigation = (): React.JSX.Element => (
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
)

export const App = (): React.JSX.Element => {
  const { data, error } = useSWR<ProjectListings, unknown>(
    config.dataApiUrl,
    async (url: string) => {
      const res = await fetch(url)
      return res.json()
    }
  )
  if (error !== undefined) {
    return <div>Nepodařilo se načíst data webu.</div>
  }
  if (!data) {
    return <div>Načítají se data webu.</div>
  }
  return (
    <Routes>
      <Route element={<Container />} path="/">
        <Route
          element={
            <div>
              <AppNavigation />
              <ProjectsList data={data} />
            </div>
          }
          path="projekty"
        />
        <Route
          element={<IssueDetail data={data} />}
          path=":owner/:project/:issue"
        />
        <Route element={<ProjectDetail data={data} />} path=":owner/:project" />
        <Route
          element={
            <div>
              <AppNavigation />
              <IssuesList data={data} />
            </div>
          }
          path="/"
        />
      </Route>
    </Routes>
  )
}
