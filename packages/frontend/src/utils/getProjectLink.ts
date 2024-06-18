import type { Project } from "../interfaces/Project";

export const getProjectLink = ({ owner, repo }: Project): string =>
  `/${owner}/${repo}`;
