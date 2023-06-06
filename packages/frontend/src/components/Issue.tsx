import type React from "react"

import type { ProjectIssueWithProjectInfo } from "../utils/getAllIssues"
import { getIssueLink } from "../utils/getIssueLink"
import { getProjectLink } from "../utils/getProjectLink"
import { ArticleBox } from "./ArticleBox"

export const Issue = ({
  issue,
  hideTags,
}: {
  issue: ProjectIssueWithProjectInfo
  hideTags?: boolean
}): React.JSX.Element => (
  <ArticleBox
    description={issue.description}
    link={getIssueLink(issue)}
    subtitle={issue.project.name}
    subtitleDescription={issue.project["short-description"]}
    subtitleLink={getProjectLink(issue.project)}
    tags={hideTags !== true ? issue.project.tags : []}
    title={issue.title}
  />
)

Issue.defaultProps = {
  hideTags: false,
}
