import { Project } from "./Project";
import { ProjectConfig } from "./ProjectConfig";
import { ProjectIssue } from "./ProjectIssue";

export interface ProjectListing {
  project: Project;
  config: ProjectConfig;
  issues: Array<ProjectIssue>;
}
