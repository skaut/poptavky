import nock from "nock";

import { IssueListError } from "../src/exceptions/IssueListError";
import { getProjectIssues } from "../src/getProjectIssues";

describe("Working issue listing", () => {
  beforeEach(() => {
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => actualQueryObject.labels === "help-wanted")
      .reply(200, [
        {
          number: 1,
          title: "CORRECT",
          body: "BODY_C",
          html_url: "https://example.test",
        },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => actualQueryObject.labels === "help wanted")
      .reply(200, [
        {
          number: 2,
          title: "INCORRECT",
          body: "BODY_I",
          html_url: "https://example.test",
        },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => !("labels" in actualQueryObject))
      .reply(200, [
        {
          number: 1,
          title: "CORRECT",
          body: "BODY_C",
          html_url: "https://example.test",
        },
        {
          number: 2,
          title: "INCORRECT",
          body: "BODY_I",
          html_url: "https://example.test",
        },
        {
          number: 3,
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
    expect.assertions(1);
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted"),
    ).resolves.toStrictEqual([
      {
        number: 1,
        title: "CORRECT",
        description: "BODY_C",
        link: "https://example.test",
      },
    ]);
  });

  test("getProjectIssues auto-populates label", async () => {
    expect.assertions(1);
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, undefined),
    ).resolves.toStrictEqual([
      {
        number: 2,
        title: "INCORRECT",
        description: "BODY_I",
        link: "https://example.test",
      },
    ]);
  });

  test("getProjectIssues omits link for private repos", async () => {
    expect.assertions(1);
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, false, "help-wanted"),
    ).resolves.toStrictEqual([
      { number: 1, title: "CORRECT", description: "BODY_C", link: undefined },
    ]);
  });
});

test("getProjectIssues auto-populates body", async () => {
  expect.assertions(1);
  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/issues")
    .query((actualQueryObject) => actualQueryObject.labels === "help-wanted")
    .reply(200, [
      { number: 1, title: "CORRECT", html_url: "https://example.test" },
    ]);
  await expect(
    getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted"),
  ).resolves.toStrictEqual([
    {
      number: 1,
      title: "CORRECT",
      description: "",
      link: "https://example.test",
    },
  ]);
  nock.cleanAll();
});

test("getProjectIssues fails gracefully on connection issues", async () => {
  expect.assertions(1);
  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/issues")
    .query(true)
    .reply(404);
  await expect(async () =>
    getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted"),
  ).rejects.toThrow(IssueListError);
  nock.cleanAll();
});
