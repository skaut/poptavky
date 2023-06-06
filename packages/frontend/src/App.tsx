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
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route
          path="projekty"
          element={
            <div>
              <AppNavigation />
              <ProjectsList data={data} />
            </div>
          }
        />
        <Route
          path=":owner/:project/:issue"
          element={<IssueDetail data={data} />}
        />
        <Route path=":owner/:project" element={<ProjectDetail data={data} />} />
        <Route
          path="/"
          element={
            <div>
              <AppNavigation />
              <IssuesList data={data} />
            </div>
          }
        />
      </Route>
    </Routes>
  )
}
