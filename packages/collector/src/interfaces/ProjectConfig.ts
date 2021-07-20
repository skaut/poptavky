import { ProjectConfigError } from "../exceptions/ProjectConfigError";

interface ProjectConfigMaintainer {
  name: string;
  email?: string;
}

interface ProjectConfigLinkSlack {
  type: "slack";
  uri: string;
  space: string;
  channel: string;
}

interface ProjectConfigLinkNamed {
  type: "github-repo" | "facebook-page" | "facebook-group";
  uri: string;
  name: string;
}

interface ProjectConfigLinkOther {
  type: "email" | "homepage" | "demo" | "issue-tracker" | "wiki" | "docs";
  uri: string;
}

type ProjectConfigLink =
  | ProjectConfigLinkSlack
  | ProjectConfigLinkNamed
  | ProjectConfigLinkOther;

export interface ProjectConfig {
  name: string;
  "short-description": string;
  description: string;
  maintainers: Array<ProjectConfigMaintainer>;
  links: Array<ProjectConfigLink>;
  "help-issue-label"?: string;
  tags?: Array<string>;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function assertIsProjectConfigMaintainer(
  maintainer: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new ProjectConfigError(e)
): asserts maintainer is ProjectConfigMaintainer {
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
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function assertIsProjectConfigLink(
  link: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new ProjectConfigError(e)
): asserts link is ProjectConfigLink {
  if (!("type" in link)) {
    throw errorFn('The link doesn\'t contain the required field "type".');
  }
  if (!("uri" in link)) {
    throw errorFn('The link doesn\'t contain the required field "uri".');
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
    ["github-repo", "facebook-page", "facebook-group"].includes(link.type)
  ) {
    if (!("name" in link)) {
      throw errorFn('The link doesn\'t contain the field "name".');
    }
    if (typeof link.name !== "string") {
      throw errorFn('The field "name" is not a string.');
    }
  } else if (
    !["email", "homepage", "demo", "issue-tracker", "wiki", "docs"].includes(
      link.type
    )
  ) {
    throw errorFn("The link type is unsupported.");
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function assertIsProjectConfig(
  config: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new ProjectConfigError(e)
): asserts config is ProjectConfig {
  if (!("name" in config)) {
    throw errorFn('The file doesn\'t contain the required field "name".');
  }
  if (!("short-description" in config)) {
    throw errorFn(
      'The file doesn\'t contain the required field "short-description".'
    );
  }
  if (!("description" in config)) {
    throw errorFn(
      'The file doesn\'t contain the required field "description".'
    );
  }
  if (!("maintainers" in config)) {
    throw errorFn(
      'The file doesn\'t contain the required field "maintainers".'
    );
  }
  if (!("links" in config)) {
    throw errorFn('The file doesn\'t contain the required field "links".');
  }
  if (typeof config.name !== "string") {
    throw errorFn('The field "name" is not a string.');
  }
  if (typeof config["short-description"] !== "string") {
    throw errorFn('The field "short-description" is not a string.');
  }
  if (typeof config.description !== "string") {
    throw errorFn('The field "description" is not a string.');
  }
  if (!Array.isArray(config.maintainers)) {
    throw errorFn('The field "maintainers" is not an array.');
  }
  if (config.maintainers.length == 0) {
    throw errorFn('The field "maintainers" is empty.');
  }
  for (const maintainer of config.maintainers) {
    assertIsProjectConfigMaintainer(maintainer, (e) =>
      errorFn('A "maintainer" field item is invalid: ' + e)
    );
  }
  if (!Array.isArray(config.links)) {
    throw errorFn('The field "links" is not an array.');
  }
  if (config.links.length == 0) {
    throw errorFn('The field "links" is empty.');
  }
  for (const link of config.links) {
    assertIsProjectConfigLink(link, (e) =>
      errorFn('A "link" field item is invalid: ' + e)
    );
  }
  if ("help-issue-label" in config) {
    if (typeof config["help-issue-label"] !== "string") {
      throw errorFn('The field "help-issue-label" is not a string.');
    }
    if (config["help-issue-label"].includes(",")) {
      throw errorFn('The field "help-issue-label" can\'t contain commas.');
    }
  }
  if ("tags" in config) {
    if (!Array.isArray(config.tags)) {
      throw errorFn('The field "tags" is not an array.');
    }
    for (const tag of config.tags) {
      if (typeof tag !== "string") {
        throw errorFn('A "tags" field item is not a string.');
      }
    }
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
