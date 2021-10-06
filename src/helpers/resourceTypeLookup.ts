const templateLookup = [
  {
    type: "tool",
    pathPrefix: "/tools/",
  },
  {
    type: "dataset",
    pathPrefix: "/datasets/",
  },
  {
    type: "paper",
    pathPrefix: "/papers/",
  },
  {
    type: "tutorial",
    pathPrefix: "/tutorials/",
  },
];

export function getPathPrefix(type: string) {
    const template = templateLookup.find((template) => template.type == type);
    if (template === undefined) {
        return null;
    }

    return template.pathPrefix;
}
