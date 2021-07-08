import { ProjectConfig } from "./ProjectConfig";
import { ProjectIssue } from "./ProjectIssue";

export type ProjectListing = ProjectConfig & {
  issues: Array<ProjectIssue>;
};
