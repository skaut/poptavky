/** @jsxImportSource @emotion/react */
import type React from "react";

import type { ProjectListings } from "../interfaces/ProjectListings";

import { Issue } from "../components/Issue";
import { getIssuesWithProjectInfo } from "../utils/getAllIssues";

export const IssuesList = ({
  data,
}: {
  readonly data: ProjectListings;
}): React.JSX.Element => {
  const issues = getIssuesWithProjectInfo(data);
  return (
    <>
      {issues.map((issue) => (
        <Issue issue={issue} key={issue.link} />
      ))}
    </>
  );
};
