import { getProjectConfig } from "./getProjectConfig";
import { ProjectListing } from "./interfaces/ProjectListing";
import { Repo } from "./interfaces/Repo";

export async function getProjectListing(
  repo: Repo
): Promise<ProjectListing | undefined> {
  // TODO: No undefined
  const config = await getProjectConfig(repo);
  console.log(config);
  return undefined;
}
