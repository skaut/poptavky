/** @jsxImportSource @emotion/react */
import React from "react"
import { testData } from "../../testData"
import { getIssuesWithProjectInfo } from "../../utils/getAllIssues"
import { Issue } from "../../components/Issue"

export const IssuesList: React.FC = () => {
  const issues = getIssuesWithProjectInfo(testData)
  return <>{issues.map(issue => <Issue key={issue.link} issue={issue} />)}</>
}
