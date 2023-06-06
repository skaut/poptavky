import { testData } from "../testData"
import { getIssuesWithProjectInfo } from "../../src/utils/getAllIssues"

test("should get all issues", () => {
  const result = getIssuesWithProjectInfo(testData)
  expect(result).toMatchSnapshot()
})

test("should all issues except one", () => {
  const result = getIssuesWithProjectInfo(testData, { omitIssueNumber: 5 })
  expect(result).toMatchSnapshot()
})
