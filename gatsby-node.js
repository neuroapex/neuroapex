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
          slug: node.slug,
        },
      });
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    "type Mdx implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        createdAt: {
          type: "String",
          resolve(source, args, context, info) {
            if (source.createdAt == null) {
              return new Date("January 1, 2021 00:00:00").toISOString();
            }
            return source.createdAt;
          },
        },
      },
    }),
  ];
  createTypes(typeDefs);
};
