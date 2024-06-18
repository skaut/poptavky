import type { GlobalConfig } from "./GlobalConfig";
import type { ProjectListing } from "./ProjectListing";

export interface ProjectListings extends GlobalConfig {
  projects: Array<ProjectListing>;
}
