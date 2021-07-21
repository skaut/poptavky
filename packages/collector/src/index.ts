import * as fs from "fs";
import * as core from "@actions/core";

import { getGlobalConfig } from "./getGlobalConfig";
import { getProjectListing } from "./getProjectListing";

import { ProjectListings } from "./interfaces/ProjectListings";

import { PoptavkyError } from "./exceptions/PoptavkyError";

async function run() {
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
    fs.writeFileSync("listings.json", JSON.stringify(listings));
  } catch (e) {
    process.exitCode = 1;
    core.setFailed((e as PoptavkyError).message);
  }
}

void run();
