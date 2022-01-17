import { Project } from "../interfaces/Project"
import { ProjectInfo } from "../interfaces/ProjectInfo"
import { ProjectIssue } from "../interfaces/ProjectIssue"
import { ProjectListings } from "../interfaces/ProjectListings"

export interface ProjectIssueWithProjectInfo extends ProjectIssue {
  project: Project & ProjectInfo
}

interface Query extends Partial<Project> {
  omitIssueNumber?: number
}

export const getIssuesWithProjectInfo = (
  projectListings: ProjectListings,
  query?: Query
): ProjectIssueWithProjectInfo[] =>
  projectListings.projects
    .filter(
      (project) =>
        !query ||
        ((!query.owner || query.owner === project.owner) &&
          (!query.repo || query.repo === project.repo))
    )
    .flatMap((project) =>
      project.issues
        .filter((issue) => !query || query.omitIssueNumber !== issue.number)
        .map((issue) => ({
          ...issue,
          project: {
            owner: project.owner,
            repo: project.repo,
            ...project.info,
          },
        }))
    )
