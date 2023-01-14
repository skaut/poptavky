import * as core from "@actions/core";
import * as fs from "fs";

import type { PoptavkyError } from "./exceptions/PoptavkyError";
import { getGlobalConfig } from "./getGlobalConfig";
import { getProjectListing } from "./getProjectListing";
import type { ProjectListings } from "./interfaces/ProjectListings";

export async function run(): Promise<void> {
  try {
    const globalConfig = getGlobalConfig();
    const listings: ProjectListings = { projects: [] };
    for (const project of globalConfig.projects) {
      try {
        listings.projects.push(await getProjectListing(project));
      } catch (e) {
        core.error(
          "There was an error while processing the project " +
            project.owner +
            "/" +
            project.repo +
            ". " +
            (e as PoptavkyError).message
        );
      }
    }
    fs.writeFileSync("../../listings.json", JSON.stringify(listings));
  } catch (e) {
    core.setFailed((e as PoptavkyError).message);
  }
}
