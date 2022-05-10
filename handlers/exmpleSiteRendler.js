const path = require("path");
const { readFile } = require("fs");
const util = require("util");

const readFileAsync = util.promisify(readFile);
const {getSiteBySiteUrl} = require("../repositories/site");

const getExmpleSite = async () => {
  const htmlFile = await readFileAsync(
    `${path.join(__dirname, "../")}html\\openingPage.html`,
    "utf8"
  );
    
  
  return htmlFile;
};

const renderExmpleSite = async (req, res) => {
  try {
    const htmlFile = await getExmpleSite();
    res.send(htmlFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { renderExmpleSite, getExmpleSite };
