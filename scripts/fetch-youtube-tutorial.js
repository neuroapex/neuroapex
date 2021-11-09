const linkFile = require("./tutorials.json");
const axios = require("axios");
const fs = require("fs");
const yaml = require("js-yaml");

/*
 * convert a string to - seperated string suitable for use
 * in URLs and filenames
 */
function getFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/*
 * an error handler function used when writing to files
 */
function errorHandler(error) {
  if (error) {
    console.log(error);
  }
}

/*
 * The youtube oembed api returns video name and video embed URL.
 * Since we also need thumbnail, that URL needs to be generated
 * manually based on the video id.
 */
async function getYTMeta(url) {
  const oembedUrl = new URL(`https://www.youtube.com/oembed?url=${url.toString()}&format=json&maxwidth=640&maxheight=480`);
  let res = await axios.get(oembedUrl.toString());
  let meta = await res.data;

  let vid = url.searchParams.get("v");

  const thumbnailUrl = new URL(`https://img.youtube.com/vi/${vid}/hqdefault.jpg`);
  meta.thumbnailUrl = thumbnailUrl.toString();
  return meta;
}

/*
 * papers.json must contain a list of youtube video URLs for which
 * data is to be fetched
 * 
 * we go over all URLs, making a request to the oembed
 * API to get data, then writing to a markdown file
 * which our web frontend can then render
 */
Object.entries(linkFile).forEach(([collection, links]) => {
  links.forEach((link) => {
    getYTMeta(new URL(link))
      .then((data) => {
        let mdFrontmatter = {};
        mdFrontmatter.type = "tutorial";
        mdFrontmatter.name = data.title;
        mdFrontmatter.url = link;
        mdFrontmatter.collection = collection;
        mdFrontmatter.header = data.thumbnailUrl;
        mdFrontmatter.tags = ["new"];
        mdFrontmatter.createdAt = new Date().toISOString();
        mdFrontmatter.updatedAt = new Date().toISOString();

        const dirPath = "./resources/tutorials/" + getFilename(data.title);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
        }

        const filePath = dirPath + "/index.mdx";
        if (fs.existsSync(filePath)) {
          var oldContents = fs.readFileSync(filePath, 'utf-8');
          var frontmatterStartPos = 3;
          oldContents = oldContents.substr(3, oldContents.length - 3);
          var frontmatterEndPos = oldContents.search("---");
          oldContents = oldContents.substr(0, frontmatterEndPos);
          
          var oldFrontmatter = yaml.load(oldContents);
          if (oldFrontmatter.createdAt) {
            mdFrontmatter.createdAt = oldFrontmatter.createdAt;
          }
        }

        var mdFile = fs.createWriteStream(filePath, { flags: "w" });

        mdFile.write("---\n", errorHandler);
        mdFile.write(yaml.dump(mdFrontmatter), errorHandler);
        mdFile.write("---\n", errorHandler);
        mdFile.write(data.html, errorHandler);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
