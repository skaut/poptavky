/** @jsxImportSource @emotion/react */
import type React from "react";

import { Route, Routes } from "react-router";
import useSWR from "swr";

import type { ProjectListings } from "./interfaces/ProjectListings";

import { AppNavigation } from "./components/AppNavigation";
import { Container } from "./components/Container";
import { config } from "./config";
import { IssueDetail } from "./pages/IssueDetail";
import { IssuesList } from "./pages/IssuesList";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ProjectsList } from "./pages/ProjectsList";

export const App = (): React.JSX.Element => {
  const { data, error } = useSWR<ProjectListings, unknown>(
    config.dataApiUrl,
    async (url: string) => {
      const res = await fetch(url);
      return res.json() as Promise<ProjectListings>;
    },
  );
  if (error !== undefined) {
    return <div>Nepodařilo se načíst data webu.</div>;
  }
  if (!data) {
    return <div>Načítají se data webu.</div>;
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
  );
};
