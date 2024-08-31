import nock from "nock";

import { VisibilityError } from "../src/exceptions/VisibilityError";
import { getProjectVisibility } from "../src/getProjectVisibility";

test("getProjectVisibility gets the correct value for a public project", async () => {
  expect.assertions(1);

  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(200, {
    private: false,
  });

  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" }),
  ).resolves.toBe(true);

  nock.cleanAll();
});

test("getProjectVisibility gets the correct value for a private project", async () => {
  expect.assertions(1);

  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(200, {
    private: true,
  });

  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" }),
  ).resolves.toBe(false);

  nock.cleanAll();
});

test("getProjectVisibility fails gracefully on connection issues", async () => {
  expect.assertions(1);

  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(404);

  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" }),
  ).rejects.toThrow(VisibilityError);

  nock.cleanAll();
});
