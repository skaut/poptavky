import { ProjectListing } from "../interfaces/ProjectListing"
import { ProjectListings } from "../interfaces/ProjectListings"

export const getProject = (projectLisstings: ProjectListings, owner: string, repo: string): ProjectListing | undefined =>
  projectLisstings.projects.find(project => project.owner === owner && project.repo === repo)