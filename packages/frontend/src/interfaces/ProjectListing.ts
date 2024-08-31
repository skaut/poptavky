import type { Project } from "./Project";
import type { ProjectInfo } from "./ProjectInfo";
import type { ProjectIssue } from "./ProjectIssue";

export type ProjectListing = {
  info: ProjectInfo;
  issues: Array<ProjectIssue>;
} & Project;
