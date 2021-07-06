interface ProjectConfigAuthor {
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
  type: "homepage" | "demo" | "issue-tracker" | "wiki" | "docs";
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
  authors: Array<ProjectConfigAuthor>;
  links: Array<ProjectConfigLink>;
  "issue-label"?: string;
  tags?: Array<string>;
}
