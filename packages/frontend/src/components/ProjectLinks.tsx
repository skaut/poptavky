import type React from "react";

import { AiFillGithub } from "react-icons/ai";
import { BiBookAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaFacebook, FaSlack } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { ImEarth } from "react-icons/im";
import { MdChecklist, MdWebAsset } from "react-icons/md";

import type { ProjectInfo, ProjectInfoLink } from "../interfaces/ProjectInfo";

import { ExtLink } from "./ExtLink";
import { Mark, Paragraph, SmallLink } from "./Typography";

export interface LinkType {
  icon?: React.ReactNode;
  label: string;
  type: ProjectInfoLink["type"];
}

export const links: Array<LinkType> = [
  {
    icon: <GrMail />,
    label: "E-mail",
    type: "email",
  },
  {
    icon: <MdWebAsset />,
    label: "Demo",
    type: "demo",
  },
  {
    icon: <HiOutlineDocumentText />,
    label: "Dokumentace",
    type: "docs",
  },
  {
    icon: <FaFacebook />,
    label: "Skupina na facebooku",
    type: "facebook-group",
  },
  {
    icon: <FaFacebook />,
    label: "Stránka na facebooku",
    type: "facebook-page",
  },
  {
    icon: <AiFillGithub />,
    label: "Repozitář",
    type: "github-repo",
  },
  {
    icon: <ImEarth />,
    label: "Web",
    type: "homepage",
  },
  {
    icon: <MdChecklist />,
    label: "Issue tracker",
    type: "issue-tracker",
  },
  {
    icon: <FaSlack />,
    label: "Slack",
    type: "slack",
  },
  {
    icon: <BiBookAlt />,
    label: "Wiki",
    type: "wiki",
  },
];

export const ProjectLinks = ({
  projectInfo,
}: {
  readonly projectInfo: ProjectInfo;
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
          (person): person is { email: string; name: string } =>
            person.email !== undefined,
        )
        .map((person) => (
          <SmallLink key={person.email}>
            <ExtLink href={`mailto:${person.email}`}>{person.name}</ExtLink>
          </SmallLink>
        ))}
    </Paragraph>
    {links.map((link) => {
      const currentLink = projectInfo.links.find(
        (item) => item.type === link.type,
      );
      if (!currentLink) {
        return undefined;
      }
      const url = new URL(currentLink.uri);
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
      );
    })}
  </>
);
