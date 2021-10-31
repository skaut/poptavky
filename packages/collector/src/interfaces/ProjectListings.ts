import type { GlobalConfig } from "./GlobalConfig";
import type { ProjectListing } from "./ProjectListing";

export type ProjectListings = GlobalConfig & {
  projects: Array<ProjectListing>;
};
