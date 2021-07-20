import { octokit } from "./octokit";

import { Project } from "./interfaces/Project";
import { ProjectIssue } from "./interfaces/ProjectIssue";

import { IssueListError } from "./exceptions/IssueListError";

export async function getProjectIssues(
  project: Project,
  publicRepo: boolean,
  issueLabel: string | undefined
): Promise<Array<ProjectIssue>> {
  issueLabel = issueLabel ?? "help wanted";
  const issues = await octokit.rest.issues
    .listForRepo({
      owner: project.owner,
      repo: project.repo,
      per_page: 100,
      labels: issueLabel,
    })
    .catch(function (e): never {
      throw new IssueListError(String(e));
    });
  return issues.data.map((issue) => {
    return {
      title: issue.title,
      description: issue.body ?? "",
      link: publicRepo ? issue.html_url : undefined,
    };
  });
}
