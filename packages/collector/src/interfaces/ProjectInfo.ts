import type { PoptavkyError } from "../exceptions/PoptavkyError.ts";

import { ProjectInfoError } from "../exceptions/ProjectInfoError.ts";

export interface ProjectInfo {
  description: string;
  "help-issue-label"?: string;
  links: Array<ProjectInfoLink>;
  maintainers: Array<ProjectInfoMaintainer>;
  name: string;
  "short-description": string;
  tags?: Array<string>;
}

type ProjectInfoLink =
  | ProjectInfoLinkNamed
  | ProjectInfoLinkOther
  | ProjectInfoLinkSlack;

interface ProjectInfoLinkNamed {
  name: string;
  type: "facebook-group" | "facebook-page" | "github-repo";
  uri: string;
}

interface ProjectInfoLinkOther {
  type: "demo" | "docs" | "email" | "homepage" | "issue-tracker" | "wiki";
  uri: string;
}

interface ProjectInfoLinkSlack {
  channel: string;
  space: string;
  type: "slack";
  uri: string;
}

interface ProjectInfoMaintainer {
  email?: string;
  name: string;
}

export function assertIsProjectInfo(
  info: unknown,
  errorFn = (e: string): ProjectInfoError => new ProjectInfoError(e),
): asserts info is ProjectInfo {
  if (typeof info !== "object" || info === null) {
    throw errorFn("The file doesn't contain a valid object.");
  }
  if (!("name" in info)) {
    throw errorFn('The file doesn\'t contain the required field "name".');
  }
  if (!("short-description" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "short-description".',
    );
  }
  if (!("description" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "description".',
    );
  }
  if (!("maintainers" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "maintainers".',
    );
  }
  if (!("links" in info)) {
    throw errorFn('The file doesn\'t contain the required field "links".');
  }
  if (typeof info.name !== "string") {
    throw errorFn('The field "name" is not a string.');
  }
  if (typeof info["short-description"] !== "string") {
    throw errorFn('The field "short-description" is not a string.');
  }
  if (typeof info.description !== "string") {
    throw errorFn('The field "description" is not a string.');
  }
  if (!Array.isArray(info.maintainers)) {
    throw errorFn('The field "maintainers" is not an array.');
  }
  if (info.maintainers.length === 0) {
    throw errorFn('The field "maintainers" is empty.');
  }
  for (const maintainer of info.maintainers) {
    assertIsProjectInfoMaintainer(maintainer, (e) =>
      errorFn(`A "maintainer" field item is invalid: ${e}`),
    );
  }
  if (!Array.isArray(info.links)) {
    throw errorFn('The field "links" is not an array.');
  }
  if (info.links.length === 0) {
    throw errorFn('The field "links" is empty.');
  }
  for (const link of info.links) {
    assertIsProjectInfoLink(link, (e) =>
      errorFn(`A "link" field item is invalid: ${e}`),
    );
  }
  if ("help-issue-label" in info) {
    if (typeof info["help-issue-label"] !== "string") {
      throw errorFn('The field "help-issue-label" is not a string.');
    }
    if (info["help-issue-label"].includes(",")) {
      throw errorFn('The field "help-issue-label" can\'t contain commas.');
    }
  }
  if ("tags" in info) {
    if (!Array.isArray(info.tags)) {
      throw errorFn('The field "tags" is not an array.');
    }
    for (const tag of info.tags) {
      if (typeof tag !== "string") {
        throw errorFn('A "tags" field item is not a string.');
      }
    }
  }
}

function assertIsProjectInfoLink(
  link: unknown,
  errorFn: (e: string) => PoptavkyError,
): asserts link is ProjectInfoLink {
  if (typeof link !== "object" || link === null) {
    throw errorFn("The link isn't a valid object.");
  }
  if (!("type" in link)) {
    throw errorFn('The link doesn\'t contain the required field "type".');
  }
  if (!("uri" in link)) {
    throw errorFn('The link doesn\'t contain the required field "uri".');
  }
  if (typeof link.type !== "string") {
    throw errorFn('The field "type" is not a string.');
  }
  if (typeof link.uri !== "string") {
    throw errorFn('The field "uri" is not a string.');
  }
  if (link.type === "slack") {
    if (!("space" in link)) {
      throw errorFn('The link doesn\'t contain the field "space".');
    }
    if (!("channel" in link)) {
      throw errorFn('The link doesn\'t contain the field "channel".');
    }
    if (typeof link.space !== "string") {
      throw errorFn('The field "space" is not a string.');
    }
    if (typeof link.channel !== "string") {
      throw errorFn('The field "channel" is not a string.');
    }
  } else if (
    ["facebook-group", "facebook-page", "github-repo"].includes(link.type)
  ) {
    if (!("name" in link)) {
      throw errorFn('The link doesn\'t contain the field "name".');
    }
    if (typeof link.name !== "string") {
      throw errorFn('The field "name" is not a string.');
    }
  } else if (
    !["demo", "docs", "email", "homepage", "issue-tracker", "wiki"].includes(
      link.type,
    )
  ) {
    throw errorFn("The link type is unsupported.");
  }
}

function assertIsProjectInfoMaintainer(
  maintainer: unknown,
  errorFn: (e: string) => PoptavkyError,
): asserts maintainer is ProjectInfoMaintainer {
  if (typeof maintainer !== "object" || maintainer === null) {
    throw errorFn("The maintainer isn't a valid object.");
  }
  if (!("name" in maintainer)) {
    throw errorFn('The maintainer doesn\'t contain the required field "name".');
  }
  if (typeof maintainer.name !== "string") {
    throw errorFn('The field "name" is not a string.');
  }
  if ("email" in maintainer && typeof maintainer.email !== "string") {
    throw errorFn('The field "email" is not a string.');
  }
}
