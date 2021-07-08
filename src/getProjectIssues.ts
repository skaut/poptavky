import { octokit } from "./octokit";

import { ProjectIssue } from "./interfaces/ProjectIssue";
import { Repo } from "./interfaces/Repo";

import { IssueListError } from "./exceptions/IssueListError";

export async function getProjectIssues(
  repo: Repo,
  issueLabel: string | undefined
): Promise<Array<ProjectIssue>> {
  issueLabel = issueLabel ?? "help-wanted";
  const issues = await octokit.rest.issues
    .listForRepo({ ...repo, per_page: 100, labels: issueLabel })
    .catch(function (e): never {
      throw new IssueListError(String(e));
    });
  return issues.data.map((issue) => {
    return { title: issue.title, description: issue.body ?? "" };
  });
}
