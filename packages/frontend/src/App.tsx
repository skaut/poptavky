/** @jsxImportSource @emotion/react */
import React from "react"
import useSWR from "swr"
import { Route, Routes } from "react-router-dom"
import { IssuesList } from "./pages/IssuesList/IssuesList"
import { IssueDetail } from "./pages/IssueDetail/IssueDetail"
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail"
import { ProjectsList } from "./pages/ProjectsList/ProjectsList"
import { Container } from "./components/Container"
import { Navigation } from "./components/Navigation"
import { config } from "./config"
import { ProjectListings } from "./interfaces/ProjectListings"

export const App: React.FC = () => {
  const { data, error } = useSWR<ProjectListings, never>(
    config.dataApiUrl,
    async (url: string) => {
      const res = await fetch(url)
      return res.json()
    }
  )
  if (error) {
    return <div>Nepodařilo se načíst data webu.</div>
  }
  if (!data) {
    return <div>Načítají se data webu.</div>
  }
  const AppNavigation = () => (
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
