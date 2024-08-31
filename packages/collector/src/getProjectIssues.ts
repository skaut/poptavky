import type { Project } from "./interfaces/Project";
import type { ProjectIssue } from "./interfaces/ProjectIssue";

import { IssueListError } from "./exceptions/IssueListError";
import { octokit } from "./octokit";

export async function getProjectIssues(
  project: Project,
  publicRepo: boolean,
  issueLabel: string | undefined,
): Promise<Array<ProjectIssue>> {
  const safeIssueLabel = issueLabel ?? "help wanted";
  const issues = await octokit.rest.issues
    .listForRepo({
      labels: safeIssueLabel,
      owner: project.owner,
      per_page: 100,
      repo: project.repo,
    })
    .catch((e: unknown): never => {
      throw new IssueListError(String(e));
    });
  return issues.data.map((issue) => ({
    description: issue.body ?? "",
    link: publicRepo ? issue.html_url : undefined,
    number: issue.number,
    title: issue.title,
  }));
}
