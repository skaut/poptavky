import type { Project } from "./Project"
import type { ProjectInfo } from "./ProjectInfo"
import type { ProjectIssue } from "./ProjectIssue"

export type ProjectListing = Project & {
  info: ProjectInfo
  issues: Array<ProjectIssue>
}
