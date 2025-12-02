import { expect, test } from "vitest";

import { ProjectInfoError } from "../../src/exceptions/ProjectInfoError.ts";
import { assertIsProjectInfo } from "../../src/interfaces/ProjectInfo.ts";

test("ProjectInfo recognizes minimal valid info", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).not.toThrowError();
});

test("ProjectInfo recognizes full valid info", () => {
  const info = {
    description: "DESCRIPTION",
    "help-issue-label": "LABEL",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ email: "test@example.test", name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
    tags: ["TAG"],
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).not.toThrowError();
});

test("ProjectInfo requires object input", () => {
  const info = false;

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires cannot be null", () => {
  const info = null;

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the name field", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the short-description field", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the description field", () => {
  const info = {
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the links field", () => {
  const info = {
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the name field to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: 42,
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the short-description field to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": 42,
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the description field to be a string", () => {
  const info = {
    description: 42,
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be an array", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: 42,
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the links field to be an array", () => {
  const info = {
    description: "DESCRIPTION",
    links: 42,
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the help-issue-label field to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    "help-issue-label": 42,
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the help-issue-label not to contain commas", () => {
  const info = {
    description: "DESCRIPTION",
    "help-issue-label": "TAG1,TAG2",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the tags field to be an array", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
    tags: 42,
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be non-empty", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the links field to be non-empty", () => {
  const info = {
    description: "DESCRIPTION",
    links: [],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to be objects", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [false],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field not to be null", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [null],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field to contain name", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }, {}],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field name to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: 42 }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the maintainers field email to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ email: 42, name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to be objects", () => {
  const info = {
    description: "DESCRIPTION",
    links: [false],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to not be null", () => {
  const info = {
    description: "DESCRIPTION",
    links: [null],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain type", () => {
  const info = {
    description: "DESCRIPTION",
    links: [
      { type: "email", uri: "mailto:test@example.test" },
      { uri: "example.test" },
    ],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain uri", () => {
  const info = {
    description: "DESCRIPTION",
    links: [
      { type: "email", uri: "mailto:test@example.test" },
      { type: "email" },
    ],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo allows the link field type to be slack", () => {
  const info = {
    description: "DESCRIPTION",
    links: [
      {
        channel: "CHANNEL",
        space: "SPACE",
        type: "slack",
        uri: "example.test",
      },
    ],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).not.toThrowError(ProjectInfoError);
});

test("ProjectInfo allows the link field type to be github-repo, facebook-page, facebook-group", () => {
  expect.assertions(3);

  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      description: "DESCRIPTION",
      links: [{ name: "NAME", type, uri: "example.test" }],
      maintainers: [{ name: "MAINTAINER" }],
      name: "NAME",
      "short-description": "DESC",
    };

    expect(() => {
      assertIsProjectInfo(info);
    }).not.toThrowError(ProjectInfoError);
  }
});

test("ProjectInfo allows the link field type to be email, homepage, demo, issue-tracker, wiki, docs", () => {
  expect.assertions(6);

  for (const type of [
    "email",
    "homepage",
    "demo",
    "issue-tracker",
    "wiki",
    "docs",
  ]) {
    const info = {
      description: "DESCRIPTION",
      links: [{ type, uri: "example.test" }],
      maintainers: [{ name: "MAINTAINER" }],
      name: "NAME",
      "short-description": "DESC",
    };

    expect(() => {
      assertIsProjectInfo(info);
    }).not.toThrowError();
  }
});

test("ProjectInfo disallows the link field type to be something else", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "RANDOM", uri: "example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field type to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: 42, uri: "example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field uri to be a string", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: 42 }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain space when the type is slack", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ channel: "CHANNEL", type: "slack", uri: "example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field space to be a string when the type is slack", () => {
  const info = {
    description: "DESCRIPTION",
    links: [
      { channel: "CHANNEL", space: 42, type: "slack", uri: "example.test" },
    ],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain channel when the type is slack", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ space: "SPACE", type: "slack", uri: "example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field channel to be a string when the type is slack", () => {
  const info = {
    description: "DESCRIPTION",
    links: [
      { channel: 42, space: "SPACE", type: "slack", uri: "example.test" },
    ],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo requires the link field to contain name when the type is github-repo, facebook-page, facebook-group", () => {
  expect.assertions(3);

  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      description: "DESCRIPTION",
      links: [{ type, uri: "example.test" }],
      maintainers: [{ name: "MAINTAINER" }],
      name: "NAME",
      "short-description": "DESC",
    };

    expect(() => {
      assertIsProjectInfo(info);
    }).toThrowError(ProjectInfoError);
  }
});

test("ProjectInfo requires the link field name to be a string when the type is github-repo, facebook-page, facebook-group", () => {
  expect.assertions(3);

  for (const type of ["github-repo", "facebook-page", "facebook-group"]) {
    const info = {
      description: "DESCRIPTION",
      links: [{ name: 42, type, uri: "example.test" }],
      maintainers: [{ name: "MAINTAINER" }],
      name: "NAME",
      "short-description": "DESC",
    };

    expect(() => {
      assertIsProjectInfo(info);
    }).toThrowError(ProjectInfoError);
  }
});

test("ProjectInfo requires the tags field to be an array of strings", () => {
  const info = {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME",
    "short-description": "DESC",
    tags: ["TAG", 42],
  };

  expect(() => {
    assertIsProjectInfo(info);
  }).toThrowError(ProjectInfoError);
});

test("ProjectInfo uses custom errors", () => {
  const info = {};

  expect(() => {
    assertIsProjectInfo(info, () => {
      throw new Error("My error");
    });
  }).toThrowError("My error");
});
