import nock from "nock";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { IssueListError } from "../src/exceptions/IssueListError";
import { getProjectIssues } from "../src/getProjectIssues";

describe("Working issue listing", () => {
  beforeEach(() => {
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query(
        (actualQueryObject) => actualQueryObject["labels"] === "help-wanted",
      )
      .reply(200, [
        {
          body: "BODY_C",
          html_url: "https://example.test",
          number: 1,
          title: "CORRECT",
        },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query(
        (actualQueryObject) => actualQueryObject["labels"] === "help wanted",
      )
      .reply(200, [
        {
          body: "BODY_I",
          html_url: "https://example.test",
          number: 2,
          title: "INCORRECT",
        },
      ]);
    nock("https://api.github.com")
      .get("/repos/OWNER/REPO/issues")
      .query((actualQueryObject) => !("labels" in actualQueryObject))
      .reply(200, [
        {
          body: "BODY_C",
          html_url: "https://example.test",
          number: 1,
          title: "CORRECT",
        },
        {
          body: "BODY_I",
          html_url: "https://example.test",
          number: 2,
          title: "INCORRECT",
        },
        {
          body: "BODY_N",
          html_url: "https://example.test",
          number: 3,
          title: "NONE",
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
        description: "BODY_C",
        link: "https://example.test",
        number: 1,
        title: "CORRECT",
      },
    ]);
  });

  test("getProjectIssues auto-populates label", async () => {
    expect.assertions(1);
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, undefined),
    ).resolves.toStrictEqual([
      {
        description: "BODY_I",
        link: "https://example.test",
        number: 2,
        title: "INCORRECT",
      },
    ]);
  });

  test("getProjectIssues omits link for private repos", async () => {
    expect.assertions(1);
    await expect(
      getProjectIssues({ owner: "OWNER", repo: "REPO" }, false, "help-wanted"),
    ).resolves.toStrictEqual([
      { description: "BODY_C", number: 1, title: "CORRECT" },
    ]);
  });
});

test("getProjectIssues auto-populates body", async () => {
  expect.assertions(1);

  nock("https://api.github.com")
    .get("/repos/OWNER/REPO/issues")
    .query((actualQueryObject) => actualQueryObject["labels"] === "help-wanted")
    .reply(200, [
      { html_url: "https://example.test", number: 1, title: "CORRECT" },
    ]);

  await expect(
    getProjectIssues({ owner: "OWNER", repo: "REPO" }, true, "help-wanted"),
  ).resolves.toStrictEqual([
    {
      description: "",
      link: "https://example.test",
      number: 1,
      title: "CORRECT",
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
