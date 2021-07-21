import { Project } from "./Project";
import { ProjectInfo } from "./ProjectInfo";
import { ProjectIssue } from "./ProjectIssue";

export type ProjectListing = Project & {
  info: ProjectInfo;
  issues: Array<ProjectIssue>;
};
