export interface ProjectInfo {
  description: string;
  "help-issue-label"?: string;
  links: Array<ProjectInfoLink>;
  maintainers: Array<ProjectInfoMaintainer>;
  name: string;
  "short-description": string;
  tags?: Array<string>;
}

export type ProjectInfoLink =
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
