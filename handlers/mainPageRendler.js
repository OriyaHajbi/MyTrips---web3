const path = require("path");
const { readFile } = require("fs");
const util = require("util");
const Promise = require("bluebird");
const {getAllSites} = require("../repositories/site");

const readFileAsync = util.promisify(readFile);

const getMainPage = async () => {
  const htmlFile = await readFileAsync(
    `${path.join(__dirname, "../")}html\\main.html`,
    "utf8"
  );
  const allSites = await getAllSites();

  const sitesName = await Promise.reduce(
    allSites,
    async (acc, site) => {
      const { siteName, siteUrl } = site;
      const op = `<option value="${siteUrl}">${siteName}</option>\n`;
      return `${acc}${op}`;
    },
    ""
  );
  return htmlFile.replace("{{ALL_SITES}}", sitesName);
};

const renderMainPage = async (req, res) => {
  try {
    const htmlFile = await getMainPage();
    res.send(htmlFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { renderMainPage, getMainPage };
