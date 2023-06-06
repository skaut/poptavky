import styled from "@emotion/styled"
import type React from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import remarkGfm from "remark-gfm"

import { ColoredTag } from "./ColoredTag"
import { Article, H2, Paragraph } from "./Typography"

export const ArticleBox = ({
  title,
  link,
  subtitle,
  subtitleLink,
  subtitleDescription,
  description,
  tags,
}: {
  title: string
  link?: string
  subtitle?: string
  subtitleLink?: string
  subtitleDescription?: string
  description: string
  tags?: Array<string>
}): React.JSX.Element => (
  <ThinArticle>
    <H2>{link !== undefined ? <Link to={link}>{title}</Link> : title}</H2>
    <ProjectName>
      {subtitle !== undefined && subtitleLink !== undefined && (
        <Link to={subtitleLink} title={subtitleDescription}>
          {subtitle}
        </Link>
      )}
    </ProjectName>
    <Paragraph>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
    </Paragraph>
    {(tags ?? []).map((tag) => (
      <ColoredTag key={tag}>{tag}</ColoredTag>
    ))}
  </ThinArticle>
)

const ProjectName = styled("p")`
  margin: 0 0 0.6em;
  * {
    font-size: 0.8rem;
  }
`

const ThinArticle = styled(Article)`
  max-width: 600px;
`
