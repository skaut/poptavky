import * as nock from "nock";

import { getProjectIssues } from "../src/getProjectIssues";

import { IssueListError } from "../src/exceptions/IssueListError";

//nock.recorder.rec();

describe("Working issue listing", () => {
  beforeEach(() => {
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => actualQueryObject.labels === "help-wanted")
      .reply(200, [
        { title: "CORRECT", body: "BODY_C", html_url: "https://example.test" },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => actualQueryObject.labels === "help wanted")
      .reply(200, [
        {
          title: "INCORRECT",
          body: "BODY_I",
          html_url: "https://example.test",
        },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => !("labels" in actualQueryObject))
      .reply(200, [
        { title: "CORRECT", body: "BODY_C", html_url: "https://example.test" },
        {
          title: "INCORRECT",
          body: "BODY_I",
          html_url: "https://example.test",
        },
        {
          title: "NONE",
          body: "BODY_N",
          html_url: "https://example.test",
        },
      ]);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("getProjectIssues gets a value", async () => {
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted")
    ).resolves.toStrictEqual([
      { title: "CORRECT", description: "BODY_C", link: "https://example.test" },
    ]);
  });

  test("getProjectIssues auto-populates label", async () => {
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, undefined)
    ).resolves.toStrictEqual([
      {
        title: "INCORRECT",
        description: "BODY_I",
        link: "https://example.test",
      },
    ]);
  });

  test("getProjectIssues omits link for private repos", async () => {
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, false, "help-wanted")
    ).resolves.toStrictEqual([
      { title: "CORRECT", description: "BODY_C", link: undefined },
    ]);
  });
});

test("getProjectIssues auto-populates body", async () => {
  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/issues")
    .query((actualQueryObject) => actualQueryObject.labels === "help-wanted")
    .reply(200, [{ title: "CORRECT", html_url: "https://example.test" }]);
  await expect(
    getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted")
  ).resolves.toStrictEqual([
    { title: "CORRECT", description: "", link: "https://example.test" },
  ]);
  nock.cleanAll();
});

test("getProjectIssues fails gracefully on connection issues", async () => {
  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/issues")
    .query(true)
    .reply(404);
  await expect(async () =>
    getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted")
  ).rejects.toThrow(IssueListError);
  nock.cleanAll();
});
