import nock from "nock";

import { ProjectInfoError } from "../src/exceptions/ProjectInfoError";
import { getProjectInfo } from "../src/getProjectInfo";

const config = {
  name: "NAME",
  "short-description": "DESC",
  description: "DESCRIPTION",
  maintainers: [{ name: "MAINTAINER" }],
  links: [{ type: "email", uri: "mailto:test@example.test" }],
};

test("getProjectInfo gets a value", async () => {
  expect.assertions(1);

  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/contents/.project-info.json")
    .reply(200, {
      content: Buffer.from(JSON.stringify(config)).toString("base64"),
    });

  await expect(
    getProjectInfo({ owner: "OWNER", repo: "REPO" }),
  ).resolves.toStrictEqual(config);

  nock.cleanAll();
});

test("getProjectInfo fails gracefully on connection issues", async () => {
  expect.assertions(1);

  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/contents/.project-info.json")
    .reply(404);

  await expect(
    getProjectInfo({ owner: "OWNER", repo: "REPO" }),
  ).rejects.toThrow(ProjectInfoError);

  nock.cleanAll();
});

test("getProjectInfo fails gracefully on invalid response", async () => {
  expect.assertions(1);

  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/contents/.project-info.json")
    .reply(200, {});

  await expect(
    getProjectInfo({ owner: "OWNER", repo: "REPO" }),
  ).rejects.toThrow(ProjectInfoError);

  nock.cleanAll();
});

test("getProjectInfo fails gracefully on invalid response 2", async () => {
  expect.assertions(1);

  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/contents/.project-info.json")
    .reply(200, {
      content: Buffer.from("RANDOM").toString("base64"),
    });

  await expect(
    getProjectInfo({ owner: "OWNER", repo: "REPO" }),
  ).rejects.toThrow(ProjectInfoError);

  nock.cleanAll();
});
