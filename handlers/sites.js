const path = require("path");
const Site = require("../models/site");
const { readFile } = require("fs");
const util = require("util");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const readFileAsync = util.promisify(readFile);

const getSitePage = async ({
  siteName,
  description,
  pictures,
  siteUrl,
}) => {
  const htmlFile = await readFileAsync(
    `${path.join(__dirname, "../")}html\\exmpleSite.html`,
    "utf8"
  );

  return htmlFile
    .replace("{{SiteName}}", siteName)
    .replace("{{Description}}", description)
    .replace("{{IMG1}}", pictures[0])
    .replace("{{IMG2}}", pictures[1])
    .replace("{{SITE_URL}}", siteUrl);
};

const renderSitePage = async (req, res) => {
  const { siteUrl, siteName, description, pictures } =
    res.site;
  try {
    const htmlFile = await getSitePage({
      siteName,
      description,
      pictures,
      siteUrl,
    });

    res.send(htmlFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveImage = ({ key, value, placeName }) => {
  if (value.type !== "image/jpeg") {
    throw new Error("File is not img of type image/jpeg");
  }

  const oldPath = value.path;
  const picName = key.replace("img", placeName);

  const newPath = path.join(
    __dirname,
    "../",
    "public",
    "images",
    `${picName}.jpg`
  );
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
  });

  return picName;
};

const addNewSite = async (req, res) => {
  const pictures = [];
  let form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    const siteName = fields.place_siteName;
    const siteUrl = _.snakeCase(fields.place_siteName);
    const description = fields.place_description;
    if (!siteName || !siteUrl || !description ) {
      return res.send(
        `<script>alert("Please Fill All Fields");window.close();</script >`
      );
    }

    _.forOwn(files, (value, key) => {
      let picName;
      try {
        picName = saveImage({
          key,
          value,
          placeName: siteUrl,
        });
      } catch (error) {
        res.send(
          `<script>alert("Failed To Upload Photo");window.close();</script >`
        );
      }

      if (!picName) {
        res.send(
          `<script>alert("Please Upload All The Photos");window.close();</script >`
        );
        return;
      }

      if (siteUrl !== picName) {
        pictures.push(picName);
      }
    });

    const site = new Site({
      siteName,
      siteUrl,
      description,
      pictures,
    });

    try {
      await site.save();
      res.send(
        `<script>alert("Site Added Successfully");window.close();</script>`
      );
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

module.exports = {
  renderSitePage,
  addNewSite,
};

