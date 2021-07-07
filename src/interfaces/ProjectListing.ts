import { ProjectConfig } from "./ProjectConfig";

interface ProjectIssue {
  title: string;
  description: string;
  duration: string;
}

export type ProjectListing = ProjectConfig & {
  issues: Array<ProjectIssue>;
};
