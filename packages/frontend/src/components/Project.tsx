import type React from "react";

import type { ProjectListing } from "../interfaces/ProjectListing";
import { getProjectLink } from "../utils/getProjectLink";
import { ArticleBox } from "./ArticleBox";

export const Project = ({
  project,
}: {
  readonly project: ProjectListing;
}): React.JSX.Element => (
  <ArticleBox
    description={project.info.description}
    link={getProjectLink(project)}
    tags={project.info.tags}
    title={project.info.name}
  />
);
