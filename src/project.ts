// import { Octokit, App, Action } from "octokit";

import { ProjectListing } from "./ProjectListing";

export function getProjectListing(_: string): ProjectListing | undefined {
  // TODO: No undefined
  console.log(process.env.TEST_SECRET);
  console.log(process.env.TEST_SECRET == "HOORAY");
  return undefined;
}
