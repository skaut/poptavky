import type { ProjectListings } from "../interfaces/ProjectListings"
import type { ProjectIssueWithProjectInfo } from "./getAllIssues"

export const getIssueWithProject = (
  projectListings: ProjectListings,
  projectOwner: string | undefined,
  projectRepo: string | undefined,
  issueNumber: number
): ProjectIssueWithProjectInfo | undefined => {
  const project = projectListings.projects.find(
    (project) => project.owner === projectOwner && project.repo === projectRepo
  )

  if (!project) {
    return
  }

  const issue = project.issues.find((issue) => issue.number === issueNumber)

  if (!issue) {
    return
  }

  return {
    ...issue,
    project: { owner: project.owner, repo: project.repo, ...project.info },
  }
}
