import { GlobalConfig } from "./GlobalConfig";
import { ProjectListing } from "./ProjectListing";

export type ProjectListings = GlobalConfig & {
  projects: Array<ProjectListing>;
};
