import type { Project } from "./interfaces/Project.ts";
import type { ProjectIssue } from "./interfaces/ProjectIssue.ts";

import { IssueListError } from "./exceptions/IssueListError.ts";
import { octokit } from "./octokit.ts";

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
    ...(publicRepo && { link: issue.html_url }),
    number: issue.number,
    title: issue.title,
  }));
}
