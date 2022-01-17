import { GlobalConfig } from "./GlobalConfig"
import { ProjectListing } from "./ProjectListing"

export interface ProjectListings extends GlobalConfig {
  projects: Array<ProjectListing>
}
