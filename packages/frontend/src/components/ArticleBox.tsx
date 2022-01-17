import React from "react"
import styled from "@emotion/styled"
import { ColoredTag } from "./ColoredTag"
import { Link } from "react-router-dom"
import { Article, H2, Paragraph } from "./Typography"
import TextTruncate from "react-text-truncate"

export const ArticleBox: React.FC<{
  title: string
  link?: string
  subtitle?: string
  subtitleLink?: string
  subtitleDescription?: string
  description: string
  tags?: string[]
}> = ({
  title,
  link,
  subtitle,
  subtitleLink,
  subtitleDescription,
  description,
  tags,
}) => (
  <ThinArticle>
    <H2>{link ? <Link to={link}>{title}</Link> : title}</H2>
    <ProjectName>
      {subtitle && subtitleLink && (
        <Link to={subtitleLink} title={subtitleDescription}>
          {subtitle}
        </Link>
      )}
    </ProjectName>
    <Paragraph>
      <TextTruncate
        line={3}
        element="span"
        truncateText="…"
        text={description}
        textTruncateChild={<></>}
      />
    </Paragraph>
    {(tags ?? []).map((tag) => (
      <ColoredTag>{tag}</ColoredTag>
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
