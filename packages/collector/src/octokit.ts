import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

const OctokitWithRest = Octokit.plugin(restEndpointMethods);
export const octokit = new OctokitWithRest({ auth: process.env.PAT });
