import * as nock from "nock";

import { getProjectVisibility } from "../src/getProjectVisibility";

import { VisibilityError } from "../src/exceptions/VisibilityError";

beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});

test("getProjectVisibility gets the correct value for a public project", async () => {
  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(200, {
    private: false,
  });
  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" })
  ).resolves.toEqual(true);
  nock.cleanAll();
});

test("getProjectVisibility gets the correct value for a private project", async () => {
  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(200, {
    private: true,
  });
  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" })
  ).resolves.toEqual(false);
  nock.cleanAll();
});

test("getProjectVisibility fails gracefully on connection issues", async () => {
  nock("https://api.github.com").get("/repos/OWNER/REPO").reply(404);
  await expect(
    getProjectVisibility({ owner: "OWNER", repo: "REPO" })
  ).rejects.toThrow(VisibilityError);
  nock.cleanAll();
});
