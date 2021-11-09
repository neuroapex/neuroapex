const idFile = require("./papers.json");
const axios = require("axios");
const fs = require("fs");
const yaml = require("js-yaml");
const xml2js = require("xml2js");


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
 * create a sleep function using promises
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/* 
 * the entrez API - https://www.ncbi.nlm.nih.gov/books/NBK25501/
 * contains the efetch endpoint which can be used to fetch paper
 * metadata from pubmed based on pmid
 * 
 * unfortunately for us, it returns data as XML, so we must convert
 * to JSON before using it
 * 
 * API rate limit is set to 3 requests per second. To be on the safe
 * side, code below sleeps for 1 second between requests
 */
async function getPubmedMeta(pmid) {
  const entrezUrl = new URL(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&rettype=xml`);
  await delay(1000);
  let res = await axios.get(entrezUrl.toString());

  let meta = await res.data;

  let jsonMeta = await xml2js.parseStringPromise(meta);
  let article = jsonMeta.PubmedArticleSet.PubmedArticle[0].MedlineCitation[0].Article[0];
  article.link = new URL(`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`);

  return article;
}

/*
 * papers.json must contain a list of PMIDs for which
 * data is to be fetched
 * 
 * we go over all PMIDs, making a request to the entrez
 * API to get data, then writing to a markdown file
 * which our web frontend can then render
 */
Object.entries(idFile).forEach(([collection, pmids]) => {
  pmids.forEach((pmid) => {
    getPubmedMeta(pmid)
      .then((data) => {
        let frontmatter = {};
        frontmatter.type = "paper";
        frontmatter.name = data.ArticleTitle[0];
        frontmatter.url = data.link.toString();
        frontmatter.collection = collection;
        frontmatter.tags = ["new"];
        frontmatter.createdAt = new Date().toISOString();
        frontmatter.updatedAt = new Date().toISOString();

        const dirPath = "./resources/papers/" + getFilename(frontmatter.name);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
        }

        const filePath = dirPath + "/index.mdx";
        if (fs.existsSync(filePath)) {
          var oldContents = fs.readFileSync(filePath, 'utf-8');
          var frontmatterStartPos = 3;
          oldContents = oldContents.substr(frontmatterStartPos, oldContents.length - 3);
          var frontmatterEndPos = oldContents.search("---");
          oldContents = oldContents.substr(0, frontmatterEndPos);
          
          var oldFrontmatter = yaml.load(oldContents);
          if (oldFrontmatter.createdAt) {
            frontmatter.createdAt = oldFrontmatter.createdAt;
          }
        }

        var mdFile = fs.createWriteStream(filePath, { flags: "w" });

        mdFile.write("---\n", errorHandler);
        mdFile.write(yaml.dump(frontmatter), errorHandler);
        mdFile.write("---\n", errorHandler);
        mdFile.write(`<p>${data.Abstract[0].AbstractText[0]}</p>`, errorHandler);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
