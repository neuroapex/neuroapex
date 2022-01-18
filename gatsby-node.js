const fs = require("fs");

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

exports.onPostBuild = ({ graphql }) => {
  return graphql(`
    {
      allMdx {
        nodes {
          slug
          frontmatter {
            name
            type
            collection
            description
            url
            tags
          }
        }
      }
    }
  `).then((result) => {
    const resourcesPath = "./public/resources";
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const allFiles = result.data.allMdx.nodes.map((node) => ({
      data: node.frontmatter,
      id: node.slug.slice(0, -1),
    }));

    const toolFiles = allFiles.filter((node) => node.data.type == "tool");
    const paperFiles = allFiles.filter((node) => node.data.type == "paper");
    const datasetFiles = allFiles.filter((node) => node.data.type == "dataset");
    const tutorialFiles = allFiles.filter(
      (node) => node.data.type == "tutorial"
    );

    /* create a JSON file for all resources */
    fs.writeFileSync(
      `${resourcesPath}/all.json`,
      JSON.stringify(allFiles, null, 2)
    );

    /* create a JSON file for all tools */
    fs.writeFileSync(
      `${resourcesPath}/tools.json`,
      JSON.stringify(toolFiles, null, 2)
    );

    /* create a JSON file for all papers */
    fs.writeFileSync(
      `${resourcesPath}/papers.json`,
      JSON.stringify(paperFiles, null, 2)
    );

    /* create a JSON file for all datasets */
    fs.writeFileSync(
      `${resourcesPath}/datasets.json`,
      JSON.stringify(datasetFiles, null, 2)
    );

    /* create a JSON file for all tutorials */
    fs.writeFileSync(
      `${resourcesPath}/tutorials.json`,
      JSON.stringify(tutorialFiles, null, 2)
    );

    /* create resources directory if it doesn't exist */
    if (!fs.existsSync(resourcesPath)) fs.mkdirSync(resourcesPath);

    /* create individual resource JSONs */
    allFiles.map((file) => {
      fs.writeFileSync(
        `${resourcesPath}/${file.id}.json`,
        JSON.stringify(file, null, 2)
      );
    });
  });
};
