import { PoptavkyError } from "../exceptions/PoptavkyError";
import { ProjectInfoError } from "../exceptions/ProjectInfoError";

interface ProjectInfoMaintainer {
  name: string;
  email?: string;
}

interface ProjectInfoLinkSlack {
  type: "slack";
  uri: string;
  space: string;
  channel: string;
}

interface ProjectInfoLinkNamed {
  type: "facebook-group" | "facebook-page" | "github-repo";
  uri: string;
  name: string;
}

interface ProjectInfoLinkOther {
  type: "demo" | "docs" | "email" | "homepage" | "issue-tracker" | "wiki";
  uri: string;
}

type ProjectInfoLink =
  | ProjectInfoLinkNamed
  | ProjectInfoLinkOther
  | ProjectInfoLinkSlack;

export interface ProjectInfo {
  name: string;
  "short-description": string;
  description: string;
  maintainers: Array<ProjectInfoMaintainer>;
  links: Array<ProjectInfoLink>;
  "help-issue-label"?: string;
  tags?: Array<string>;
}

function assertIsProjectInfoMaintainer(
  maintainer: unknown,
  errorFn: (e: string) => PoptavkyError
): asserts maintainer is ProjectInfoMaintainer {
  if (typeof maintainer !== "object" || maintainer === null) {
    throw errorFn("The maintainer isn't a valid object.");
  }
  if (!("name" in maintainer)) {
    throw errorFn('The maintainer doesn\'t contain the required field "name".');
  }
  const maintainerWithProps = maintainer as { name: unknown }; // microsoft/TypeScript#21732
  if (typeof maintainerWithProps.name !== "string") {
    throw errorFn('The field "name" is not a string.');
  }
  if (
    "email" in maintainer &&
    typeof (maintainer as { email: unknown }).email !== "string" // microsoft/TypeScript#21732
  ) {
    throw errorFn('The field "email" is not a string.');
  }
}

function assertIsProjectInfoLink(
  link: unknown,
  errorFn: (e: string) => PoptavkyError
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
  // microsoft/TypeScript#21732
  if (typeof (link as { type: unknown }).type !== "string") {
    throw errorFn('The field "type" is not a string.');
  }
  const linkWithProps = link as { type: string; uri: unknown }; // microsoft/TypeScript#21732
  if (typeof linkWithProps.uri !== "string") {
    throw errorFn('The field "uri" is not a string.');
  }
  if (linkWithProps.type === "slack") {
    if (!("space" in link)) {
      throw errorFn('The link doesn\'t contain the field "space".');
    }
    if (!("channel" in link)) {
      throw errorFn('The link doesn\'t contain the field "channel".');
    }
    // microsoft/TypeScript#21732
    const linkWithSlackProps = link as {
      type: unknown;
      uri: unknown;
      space: unknown;
      channel: unknown;
    };
    if (typeof linkWithSlackProps.space !== "string") {
      throw errorFn('The field "space" is not a string.');
    }
    if (typeof linkWithSlackProps.channel !== "string") {
      throw errorFn('The field "channel" is not a string.');
    }
  } else if (
    ["github-repo", "facebook-page", "facebook-group"].includes(
      linkWithProps.type
    )
  ) {
    if (!("name" in link)) {
      throw errorFn('The link doesn\'t contain the field "name".');
    }
    // microsoft/TypeScript#21732
    const linkWithNameProp = link as {
      type: unknown;
      uri: unknown;
      name: unknown;
    };
    if (typeof linkWithNameProp.name !== "string") {
      throw errorFn('The field "name" is not a string.');
    }
  } else if (
    !["email", "homepage", "demo", "issue-tracker", "wiki", "docs"].includes(
      linkWithProps.type
    )
  ) {
    throw errorFn("The link type is unsupported.");
  }
}

export function assertIsProjectInfo(
  info: unknown,
  errorFn = (e: string): ProjectInfoError => new ProjectInfoError(e)
): asserts info is ProjectInfo {
  if (typeof info !== "object" || info === null) {
    throw errorFn("The file doesn't contain a valid object.");
  }
  if (!("name" in info)) {
    throw errorFn('The file doesn\'t contain the required field "name".');
  }
  if (!("short-description" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "short-description".'
    );
  }
  if (!("description" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "description".'
    );
  }
  if (!("maintainers" in info)) {
    throw errorFn(
      'The file doesn\'t contain the required field "maintainers".'
    );
  }
  if (!("links" in info)) {
    throw errorFn('The file doesn\'t contain the required field "links".');
  }
  // microsoft/TypeScript#21732
  const infoWithProps = info as {
    name: unknown;
    "short-description": unknown;
    description: unknown;
    maintainers: unknown;
    links: unknown;
  };
  if (typeof infoWithProps.name !== "string") {
    throw errorFn('The field "name" is not a string.');
  }
  if (typeof infoWithProps["short-description"] !== "string") {
    throw errorFn('The field "short-description" is not a string.');
  }
  if (typeof infoWithProps.description !== "string") {
    throw errorFn('The field "description" is not a string.');
  }
  if (!Array.isArray(infoWithProps.maintainers)) {
    throw errorFn('The field "maintainers" is not an array.');
  }
  if (infoWithProps.maintainers.length == 0) {
    throw errorFn('The field "maintainers" is empty.');
  }
  for (const maintainer of infoWithProps.maintainers) {
    assertIsProjectInfoMaintainer(maintainer, (e) =>
      errorFn('A "maintainer" field item is invalid: ' + e)
    );
  }
  if (!Array.isArray(infoWithProps.links)) {
    throw errorFn('The field "links" is not an array.');
  }
  if (infoWithProps.links.length == 0) {
    throw errorFn('The field "links" is empty.');
  }
  for (const link of infoWithProps.links) {
    assertIsProjectInfoLink(link, (e) =>
      errorFn('A "link" field item is invalid: ' + e)
    );
  }
  if ("help-issue-label" in info) {
    // microsoft/TypeScript#21732
    const infoWithHelpIssueLabel = info as {
      name: unknown;
      "short-description": unknown;
      description: unknown;
      maintainers: unknown;
      links: unknown;
      "help-issue-label": unknown;
    };
    if (typeof infoWithHelpIssueLabel["help-issue-label"] !== "string") {
      throw errorFn('The field "help-issue-label" is not a string.');
    }
    if (infoWithHelpIssueLabel["help-issue-label"].includes(",")) {
      throw errorFn('The field "help-issue-label" can\'t contain commas.');
    }
  }
  if ("tags" in info) {
    // microsoft/TypeScript#21732
    const infoWithTags = info as {
      name: unknown;
      "short-description": unknown;
      description: unknown;
      maintainers: unknown;
      links: unknown;
      tags: unknown;
    };
    if (!Array.isArray(infoWithTags.tags)) {
      throw errorFn('The field "tags" is not an array.');
    }
    for (const tag of infoWithTags.tags) {
      if (typeof tag !== "string") {
        throw errorFn('A "tags" field item is not a string.');
      }
    }
  }
}
