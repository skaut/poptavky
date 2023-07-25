import type { ReactNode } from "react"
import type React from "react"
import { AiFillGithub } from "react-icons/ai"
import { BiBookAlt } from "react-icons/bi"
import { BsFillPersonFill } from "react-icons/bs"
import { FaFacebook, FaSlack } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { HiOutlineDocumentText } from "react-icons/hi"
import { ImEarth } from "react-icons/im"
import { MdWebAsset } from "react-icons/md"
import { MdChecklist } from "react-icons/md"

import type { ProjectInfo, ProjectInfoLink } from "../interfaces/ProjectInfo"
import { ExtLink } from "./ExtLink"
import { Mark, Paragraph, SmallLink } from "./Typography"

export interface LinkType {
  type: ProjectInfoLink["type"]
  label: string
  icon?: ReactNode
}

export const links: Array<LinkType> = [
  {
    type: "email",
    label: "E-mail",
    icon: <GrMail />,
  },
  {
    type: "demo",
    label: "Demo",
    icon: <MdWebAsset />,
  },
  {
    type: "docs",
    label: "Dokumentace",
    icon: <HiOutlineDocumentText />,
  },
  {
    type: "facebook-group",
    label: "Skupina na facebooku",
    icon: <FaFacebook />,
  },
  {
    type: "facebook-page",
    label: "Stránka na facebooku",
    icon: <FaFacebook />,
  },
  {
    type: "github-repo",
    label: "Repozitář",
    icon: <AiFillGithub />,
  },
  {
    type: "homepage",
    label: "Web",
    icon: <ImEarth />,
  },
  {
    type: "issue-tracker",
    label: "Issue tracker",
    icon: <MdChecklist />,
  },
  {
    type: "slack",
    label: "Slack",
    icon: <FaSlack />,
  },
  {
    type: "wiki",
    label: "Wiki",
    icon: <BiBookAlt />,
  },
]

export const ProjectLinks = ({
  projectInfo,
}: {
  readonly projectInfo: ProjectInfo
}): React.JSX.Element => (
  <>
    <Paragraph>
      <Mark>
        <BsFillPersonFill />
        &nbsp;
        {projectInfo.maintainers.length > 1 ? "Správci:" : "Správce:"}
      </Mark>
      {projectInfo.maintainers
        .filter(
          (person): person is { name: string; email: string } =>
            person.email !== undefined
        )
        .map((person) => (
          <SmallLink key={person.email}>
            <ExtLink href={`mailto:${person.email}`}>{person.name}</ExtLink>
          </SmallLink>
        ))}
    </Paragraph>
    {links.map((link) => {
      const currentLink = projectInfo.links.find(
        (item) => item.type === link.type
      )
      if (!currentLink) {
        return undefined
      }
      const url = new URL(currentLink.uri)
      return (
        <Paragraph key={link.type}>
          <Mark>
            {link.icon}&nbsp;{link.label}:
          </Mark>
          <SmallLink key={link.type}>
            <ExtLink href={currentLink.uri}>
              {`${url.host}${url.pathname}`}
            </ExtLink>
          </SmallLink>
        </Paragraph>
      )
    })}
  </>
)
