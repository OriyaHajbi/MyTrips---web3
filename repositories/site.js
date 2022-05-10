const Site = require("../models/site");

const getAllSites = async() => {
    const sites = await Site.find();
    return sites;
};

const deleteAll = async() => {
    const sites = await Site.deleteMany({});
    return sites;
};
const getSiteBySiteUrl = async(req, res, next) => {
    try {
        const site = await Site.findOne({ siteUrl: req.params.siteUrl }).exec();

        if (site == null) {
            return res.status(404).json({ message: "Cannot find site" });
        }

        res.site = site;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
};

const deleteSiteBySiteUrl = async(req, res, next) => {
    try {
        const { deletedCount } = await Site.deleteOne({
            siteUrl: req.params.siteUrl,
            canBeDeleted: true,
        });

        res.deletedCount = deletedCount;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
};


module.exports = {
    getAllSites,
    getSiteBySiteUrl,
    deleteSiteBySiteUrl,
    deleteAll,
};