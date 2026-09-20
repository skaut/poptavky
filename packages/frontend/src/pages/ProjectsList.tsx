import type React from "react";

import type { ProjectListings } from "../interfaces/ProjectListings";

import { Project } from "../components/Project";

export const ProjectsList = ({
  data,
}: {
  readonly data: ProjectListings;
}): React.JSX.Element => (
  <>
    {data.projects.map((project) => (
      <Project key={`${project.owner}/${project.repo}`} project={project} />
    ))}
  </>
);
