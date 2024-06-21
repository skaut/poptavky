import type { ProjectListings } from "../interfaces/ProjectListings";
import type { ProjectIssueWithProjectInfo } from "./getAllIssues";

export const getIssueWithProject = (
  projectListings: ProjectListings,
  projectOwner: string | undefined,
  projectRepo: string | undefined,
  issueNumber: number,
): ProjectIssueWithProjectInfo | undefined => {
  const project = projectListings.projects.find(
    (item) => item.owner === projectOwner && item.repo === projectRepo,
  );

  if (!project) {
    return;
  }

  const issue = project.issues.find((item) => item.number === issueNumber);

  if (!issue) {
    return;
  }

  return {
    ...issue,
    project: { owner: project.owner, repo: project.repo, ...project.info },
  };
};
