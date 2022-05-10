const path = require("path");
const { readFile } = require("fs");
const util = require("util");

const readFileAsync = util.promisify(readFile);

const getAddSitePage = async () => {
  const htmlFile = await readFileAsync(
    `${path.join(__dirname, "../")}html\\addSite.html`,
    "utf8"
  );
  
 
  return htmlFile;
};

const renderaddSite = async (req, res) => {
  try {
    const htmlFile = await getAddSitePage();
    res.send(htmlFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { renderaddSite, getAddSitePage };
