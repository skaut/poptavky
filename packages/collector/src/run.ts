import * as core from "@actions/core";
import * as fs from "fs";

import type { PoptavkyError } from "./exceptions/PoptavkyError.ts";
import type { ProjectListings } from "./interfaces/ProjectListings.ts";

import { getGlobalConfig } from "./getGlobalConfig.ts";
import { getProjectListing } from "./getProjectListing.ts";

export async function run(): Promise<void> {
  try {
    const globalConfig = getGlobalConfig();
    const listings: ProjectListings = { projects: [] };
    const listingPromises = [];
    for (const project of globalConfig.projects) {
      listingPromises.push(
        getProjectListing(project)
          .then((listing) => {
            listings.projects.push(listing);
          })
          .catch((e: unknown) => {
            core.error(
              `There was an error while processing the project ${project.owner}/${project.repo}. ${(e as PoptavkyError).message}`,
            );
          }),
      );
    }
    await Promise.allSettled(listingPromises);
    fs.writeFileSync("../../listings.json", JSON.stringify(listings));
  } catch (e) {
    core.setFailed((e as PoptavkyError).message);
  }
}
