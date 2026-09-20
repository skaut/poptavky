import type { Project } from "../interfaces/Project";
import type { ProjectInfo } from "../interfaces/ProjectInfo";
import type { ProjectIssue } from "../interfaces/ProjectIssue";
import type { ProjectListings } from "../interfaces/ProjectListings";

export interface ProjectIssueWithProjectInfo extends ProjectIssue {
  project: Project & ProjectInfo;
}

interface Query extends Partial<Project> {
  omitIssueNumber: number | undefined;
}

export const getIssuesWithProjectInfo = (
  projectListings: ProjectListings,
  query?: Query,
): Array<ProjectIssueWithProjectInfo> =>
  projectListings.projects
    .filter(
      (project) =>
        !query ||
        ((query.owner === undefined || query.owner === project.owner) &&
          (query.repo === undefined || query.repo === project.repo)),
    )
    .flatMap((project) =>
      project.issues
        .filter((issue) => query?.omitIssueNumber !== issue.number)
        .map((issue) => ({
          ...issue,
          project: {
            owner: project.owner,
            repo: project.repo,
            ...project.info,
          },
        })),
    );
