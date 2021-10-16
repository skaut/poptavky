import { assertIsProjectInfo } from "../../src/interfaces/ProjectInfo";

import { ProjectInfoError } from "../../src/exceptions/ProjectInfoError";

test("ProjectInfo recognizes minimal valid info", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).not.toThrow();
});

test("ProjectInfo recognizes full valid info", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER", email: "test@example.test" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    "help-issue-label": "LABEL",
    tags: ["TAG"],
  };
  expect(() => assertIsProjectInfo(info)).not.toThrow();
});

test("ProjectInfo requires object input", () => {
  const info = false;
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires cannot be null", () => {
  const info = null;
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the name field", () => {
  const info = {
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the short-description field", () => {
  const info = {
    name: "NAME",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the description field", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the links field", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the name field to be a string", () => {
  const info = {
    name: 42,
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the short-description field to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": 42,
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the description field to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: 42,
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be an array", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: 42,
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the links field to be an array", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: 42,
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the help-issue-label field to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    "help-issue-label": 42,
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the help-issue-label not to contain commas", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    "help-issue-label": "TAG1,TAG2",
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the tags field to be an array", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    tags: 42,
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be non-empty", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the links field to be non-empty", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be objects", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [false],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field not to be null", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [null],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to contain name", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }, {}],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field name to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: 42 }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field email to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER", email: 42 }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to be objects", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [false],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to not be null", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [null],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain type", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [
      { type: "email", uri: "mailto:test@example.test" },
      { uri: "example.test" },
    ],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain uri", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [
      { type: "email", uri: "mailto:test@example.test" },
      { type: "email" },
    ],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo allows the link field type to be slack", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [
      {
        type: "slack",
        uri: "example.test",
        space: "SPACE",
        channel: "CHANNEL",
      },
    ],
  };
  expect(() => assertIsProjectInfo(info)).not.toThrow(ProjectInfoError);
});

test("ProjectInfo allows the link field type to be github-repo, facebook-page, facebook-group", () => {
  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      name: "NAME",
      "short-description": "DESC",
      description: "DESCRIPTION",
      maintainers: [{ name: "MAINTAINER" }],
      links: [{ type, uri: "example.test", name: "NAME" }],
    };
    expect(() => assertIsProjectInfo(info)).not.toThrow(ProjectInfoError);
  }
});

test("ProjectInfo allows the link field type to be email, homepage, demo, issue-tracker, wiki, docs", () => {
  for (const type of [
    "email",
    "homepage",
    "demo",
    "issue-tracker",
    "wiki",
    "docs",
  ]) {
    const info = {
      name: "NAME",
      "short-description": "DESC",
      description: "DESCRIPTION",
      maintainers: [{ name: "MAINTAINER" }],
      links: [{ type, uri: "example.test" }],
    };
    expect(() => assertIsProjectInfo(info)).not.toThrow();
  }
});

test("ProjectInfo disallows the link field type to be something else", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "RANDOM", uri: "example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field type to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: 42, uri: "example.test" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field uri to be a string", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: 42 }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain space when the type is slack", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "slack", uri: "example.test", channel: "CHANNEL" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field space to be a string when the type is slack", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [
      { type: "slack", uri: "example.test", space: 42, channel: "CHANNEL" },
    ],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain channel when the type is slack", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "slack", uri: "example.test", space: "SPACE" }],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field channel to be a string when the type is slack", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [
      { type: "slack", uri: "example.test", space: "SPACE", channel: 42 },
    ],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain name when the type is github-repo, facebook-page, facebook-group", () => {
  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      name: "NAME",
      "short-description": "DESC",
      description: "DESCRIPTION",
      maintainers: [{ name: "MAINTAINER" }],
      links: [{ type, uri: "example.test" }],
    };
    expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
  }
});

test("ProjectInfo requires the link field name to be a string when the type is github-repo, facebook-page, facebook-group", () => {
  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      name: "NAME",
      "short-description": "DESC",
      description: "DESCRIPTION",
      maintainers: [{ name: "MAINTAINER" }],
      links: [{ type, uri: "example.test", name: 42 }],
    };
    expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
  }
});

test("ProjectInfo requires the tags field to be an array of strings", () => {
  const info = {
    name: "NAME",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    tags: ["TAG", 42],
  };
  expect(() => assertIsProjectInfo(info)).toThrow(ProjectInfoError);
});

// TODO

test("ProjectInfo uses custom errors", () => {
  const info = {};
  expect(() =>
    assertIsProjectInfo(info, () => {
      throw new Error("My error");
    })
  ).toThrow("My error");
});
