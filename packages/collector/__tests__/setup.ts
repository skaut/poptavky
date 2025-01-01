import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import nock from "nock";
import nodeFetch from "node-fetch";

nock.disableNetConnect();

jest.mock("../src/octokit", () => {
  const OctokitWithRest = Octokit.plugin(restEndpointMethods);
  return {
    octokit: new OctokitWithRest({
      auth: process.env["PAT"],
      request: {
        fetch: nodeFetch,
      },
    }),
  };
});
