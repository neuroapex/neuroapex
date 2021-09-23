const jsonFile = require("../static/data.json");
const fs = require("fs");
const yaml = require("js-yaml");

function getFilename(name) {
    return name.replace(/ /g, '-').toLowerCase();
}

function errorHandler(error) {
    if (error) {
        console.log(error);
    }
}

const resources = [
    {
        key: "tools",
        type: "tool",
        directory: "./resources/tools"
    },
    {
        key: "datasets",
        type: "dataset",
        directory: "./resources/datasets"
    },
    {
        key: "tutorials",
        type: "tutorial",
        directory: "./resources/tutorials"
    },
    {
        key: "papers",
        type: "paper",
        directory: "./resources/papers"
    }
]

resources.forEach((resource) => {
    jsonFile[resource.key].forEach((elem) => {
        /* add type */
        elem.type = resource.type;
        elem.collection = elem.name;
    
        /* construct directory name and create directory if necessary */
        const dirPath = resource.directory + "/" + getFilename(elem.name);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    
        /* open file for writing */
        const filePath = dirPath + "/index.mdx";
        var mdFile = fs.createWriteStream(filePath, {
            flags: "w"
        });
    
        /* write yaml frontmatter to file */
        mdFile.write("---\n", errorHandler);
        mdFile.write(yaml.dump(elem), errorHandler);
        mdFile.write("---\n", errorHandler);
        mdFile.end();
    })
})
