import type { ProjectIssueWithProjectInfo } from "./getAllIssues"

export const getIssueLink = (issue: ProjectIssueWithProjectInfo): string =>
  `/${issue.project.owner}/${issue.project.repo}/${issue.number}`
