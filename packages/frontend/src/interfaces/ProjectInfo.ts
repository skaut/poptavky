interface ProjectInfoMaintainer {
  email?: string;
  name: string;
}

interface ProjectInfoLinkSlack {
  channel: string;
  space: string;
  type: "slack";
  uri: string;
}

interface ProjectInfoLinkNamed {
  name: string;
  type: "facebook-group" | "facebook-page" | "github-repo";
  uri: string;
}

interface ProjectInfoLinkOther {
  type: "demo" | "docs" | "email" | "homepage" | "issue-tracker" | "wiki";
  uri: string;
}

export type ProjectInfoLink =
  | ProjectInfoLinkNamed
  | ProjectInfoLinkOther
  | ProjectInfoLinkSlack;

export interface ProjectInfo {
  description: string;
  "help-issue-label"?: string;
  links: Array<ProjectInfoLink>;
  maintainers: Array<ProjectInfoMaintainer>;
  name: string;
  "short-description": string;
  tags?: Array<string>;
}
