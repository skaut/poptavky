import { ProjectIssueWithProjectInfo } from "../utils/getAllIssues"
import { ArticleBox } from "./ArticleBox"
import { getIssueLink } from "../utils/getIssueLink"
import { getProjectLink } from "../utils/getProjectLink"

export const Issue = ({
  issue,
  hideTags,
}: {
  issue: ProjectIssueWithProjectInfo
  hideTags?: boolean
}) => (
  <ArticleBox
    title={issue.title}
    link={getIssueLink(issue)}
    subtitle={issue.project.name}
    subtitleDescription={issue.project["short-description"]}
    subtitleLink={getProjectLink(issue.project)}
    description={issue.description}
    tags={!hideTags ? issue.project.tags : []}
  />
)
