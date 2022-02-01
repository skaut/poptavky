/** @jsxImportSource @emotion/react */
import React from "react"
import { getIssuesWithProjectInfo } from "../../utils/getAllIssues"
import { Issue } from "../../components/Issue"
import { ProjectListings } from "../../interfaces/ProjectListings"

export const IssuesList: React.FC<{ data: ProjectListings }> = ({ data }) => {
  const issues = getIssuesWithProjectInfo(data)
  return (
    <>
      {issues.map((issue) => (
        <Issue key={issue.link} issue={issue} />
      ))}
    </>
  )
}
