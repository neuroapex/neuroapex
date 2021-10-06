const templateLookup = [
  {
    type: "tool",
    template: require.resolve(`./src/templates/toolTemplate.js`),
    pathPrefix: "/tools/",
  },
  {
    type: "dataset",
    template: require.resolve(`./src/templates/datasetTemplate.js`),
    pathPrefix: "/datasets/",
  },
  {
    type: "paper",
    template: require.resolve(`./src/templates/paperTemplate.js`),
    pathPrefix: "/papers/",
  },
  {
    type: "tutorial",
    template: require.resolve(`./src/templates/tutorialTemplate.js`),
    pathPrefix: "/tutorials/",
  },
];

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMdx {
        nodes {
          slug
          frontmatter {
            type
            collection
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMdx.nodes.forEach((node) => {
      const template = templateLookup.find(
        (e) => e.type == node.frontmatter.type
      );
      if (template === undefined) {
        return Promise.reject("Template is undefined");
      }
      createPage({
        path: template.pathPrefix + node.slug,
        component: template.template,
        context: {
          // additional data can be passed via context
          collection: node.frontmatter.collection,
          slug: node.slug
        },
      });
    });
  });
};
