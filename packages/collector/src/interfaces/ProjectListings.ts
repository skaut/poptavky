import type { GlobalConfig } from "./GlobalConfig.ts";
import type { ProjectListing } from "./ProjectListing.ts";

export interface ProjectListings extends GlobalConfig {
  projects: Array<ProjectListing>;
}
