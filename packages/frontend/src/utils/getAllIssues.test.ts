import { testData } from "../testData"
import { getIssuesWithProjectInfo } from "./getAllIssues"

it("should get all issues", () => {
  const result = getIssuesWithProjectInfo(testData)
  expect(result).toMatchSnapshot()
})

it("should all issues except one", () => {
  const result = getIssuesWithProjectInfo(testData, { omitIssueNumber: 5 })
  expect(result).toMatchSnapshot()
})
