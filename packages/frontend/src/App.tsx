/** @jsxImportSource @emotion/react */
import React from "react"
import useSWR from "swr"
import { Route, Routes } from "react-router-dom"
import { IssuesList } from "./pages/IssuesList/IssuesList"
import { IssueDetail } from "./pages/IssueDetail/IssueDetail"
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail"
import { ProjectsList } from "./pages/ProjectsList/ProjectsList"
import { Container } from "./components/Container"
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
      <Routes>
        <Route path="/" element={<Container />}>
          <Route
            path="projekty"
            element={<ProjectsList data={data} />}
          />
          <Route
            path=":owner/:project/:issue"
            element={<IssueDetail data={data} />}
          />
          <Route
            path=":owner/:project"
            element={<ProjectDetail data={data} />}
          />
          <Route
            path="/"
            element={<IssuesList data={data} />}
          />
        </Route>
      </Routes>
  )
}
