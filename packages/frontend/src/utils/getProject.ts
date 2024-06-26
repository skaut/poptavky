import type { ProjectListing } from "../interfaces/ProjectListing";
import type { ProjectListings } from "../interfaces/ProjectListings";

export const getProject = (
  projectLisstings: ProjectListings,
  owner: string | undefined,
  repo: string | undefined,
): ProjectListing | undefined =>
  projectLisstings.projects.find(
    (project) => project.owner === owner && project.repo === repo,
  );
