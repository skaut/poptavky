interface ProjectInfoMaintainer {
  name: string
  email?: string
}

interface ProjectInfoLinkSlack {
  type: "slack"
  uri: string
  space: string
  channel: string
}

interface ProjectInfoLinkNamed {
  type: "facebook-group" | "facebook-page" | "github-repo"
  uri: string
  name: string
}

interface ProjectInfoLinkOther {
  type: "demo" | "docs" | "email" | "homepage" | "issue-tracker" | "wiki"
  uri: string
}

export type ProjectInfoLink =
  | ProjectInfoLinkNamed
  | ProjectInfoLinkOther
  | ProjectInfoLinkSlack

export interface ProjectInfo {
  name: string
  "short-description": string
  description: string
  maintainers: Array<ProjectInfoMaintainer>
  links: Array<ProjectInfoLink>
  "help-issue-label"?: string
  tags?: Array<string>
}
