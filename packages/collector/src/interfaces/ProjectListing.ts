import type { Project } from "./Project.ts";
import type { ProjectInfo } from "./ProjectInfo.ts";
import type { ProjectIssue } from "./ProjectIssue.ts";

export type ProjectListing = Project & {
  info: ProjectInfo;
  issues: Array<ProjectIssue>;
};
