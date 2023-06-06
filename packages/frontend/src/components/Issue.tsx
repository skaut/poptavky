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
    title={issue.title}
    link={getIssueLink(issue)}
    subtitle={issue.project.name}
    subtitleDescription={issue.project["short-description"]}
    subtitleLink={getProjectLink(issue.project)}
    description={issue.description}
    tags={hideTags !== true ? issue.project.tags : []}
  />
)
