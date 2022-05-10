const Site = require("./models/site");
sitesJson = require("./sites/sites.json");
const Promise = require("bluebird");

const addSites = async (req, res) => {
  try {
    await Site.deleteMany({});

    await Promise.map(sitesJson, async (site) => {
      const subscriber = new Site(site);
      await subscriber.save();
    });

    res.send("Init");
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addSites };