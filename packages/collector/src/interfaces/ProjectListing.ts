import { Project } from "./Project";
import { ProjectConfig } from "./ProjectConfig";
import { ProjectIssue } from "./ProjectIssue";

export type ProjectListing = Project & {
  info: ProjectConfig;
  issues: Array<ProjectIssue>;
};
