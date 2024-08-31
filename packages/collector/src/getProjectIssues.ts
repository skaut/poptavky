import { IssueListError } from "./exceptions/IssueListError";
import type { Project } from "./interfaces/Project";
import type { ProjectIssue } from "./interfaces/ProjectIssue";
import { octokit } from "./octokit";

export async function getProjectIssues(
  project: Project,
  publicRepo: boolean,
  issueLabel: string | undefined,
): Promise<Array<ProjectIssue>> {
  issueLabel ??= "help wanted";
  const issues = await octokit.rest.issues
    .listForRepo({
      owner: project.owner,
      repo: project.repo,
      per_page: 100,
      labels: issueLabel,
    })
    .catch((e: unknown): never => {
      throw new IssueListError(String(e));
    });
  return issues.data.map((issue) => ({
    number: issue.number,
    title: issue.title,
    description: issue.body ?? "",
    link: publicRepo ? issue.html_url : undefined,
  }));
}
