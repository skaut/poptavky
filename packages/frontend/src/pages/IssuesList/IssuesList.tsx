/** @jsxImportSource @emotion/react */
import { getIssuesWithProjectInfo } from "../../utils/getAllIssues"
import { Issue } from "../../components/Issue"
import { ProjectListings } from "../../interfaces/ProjectListings"

export const IssuesList = ({ data }: { data: ProjectListings }) => {
  const issues = getIssuesWithProjectInfo(data)
  return (
    <>
      {issues.map((issue) => (
        <Issue key={issue.link} issue={issue} />
      ))}
    </>
  )
}
