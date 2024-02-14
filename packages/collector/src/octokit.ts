import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

// eslint-disable-next-line @typescript-eslint/naming-convention
const OctokitWithRest = Octokit.plugin(restEndpointMethods);
export const octokit = new OctokitWithRest({ auth: process.env.PAT });
