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
  type: "github-repo" | "facebook-page" | "facebook-group"
  uri: string
  name: string
}

interface ProjectInfoLinkOther {
  type: "email" | "homepage" | "demo" | "issue-tracker" | "wiki" | "docs"
  uri: string
}

export type ProjectInfoLink =
  | ProjectInfoLinkSlack
  | ProjectInfoLinkNamed
  | ProjectInfoLinkOther

export interface ProjectInfo {
  name: string
  "short-description": string
  description: string
  maintainers: Array<ProjectInfoMaintainer>
  links: Array<ProjectInfoLink>
  "help-issue-label"?: string
  tags?: Array<string>
}
