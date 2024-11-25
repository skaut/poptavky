import type React from "react";

import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";

import { ColoredTag } from "./ColoredTag";
import { Article, H2, Paragraph } from "./Typography";

const ThinArticle = styled(Article)`
  max-width: 600px;
`;

const ProjectName = styled("p")`
  margin: 0 0 0.6em;
  * {
    font-size: 0.8rem;
  }
`;

const emptyArray: Array<string> = [];

export const ArticleBox = ({
  description,
  link = undefined,
  subtitle = undefined,
  subtitleDescription = undefined,
  subtitleLink = undefined,
  tags = emptyArray,
  title,
}: {
  readonly description: string;
  readonly link?: string;
  readonly subtitle?: string;
  readonly subtitleDescription?: string;
  readonly subtitleLink?: string;
  readonly tags?: Array<string>;
  readonly title: string;
}): React.JSX.Element => (
  <ThinArticle>
    <H2>{link !== undefined ? <Link to={link}>{title}</Link> : title}</H2>
    <ProjectName>
      {subtitle !== undefined && subtitleLink !== undefined && (
        <Link title={subtitleDescription} to={subtitleLink}>
          {subtitle}
        </Link>
      )}
    </ProjectName>
    <Paragraph>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
    </Paragraph>
    {tags.map((tag) => (
      <ColoredTag key={tag}>{tag}</ColoredTag>
    ))}
  </ThinArticle>
);
