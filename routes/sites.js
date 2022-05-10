const express = require('express')
const router = express.Router()

const { renderSitePage, addNewSite } = require("../handlers/sites");


const {
    getSiteBySiteUrl,
    getAllSites,
    deleteAll,
    deleteSiteBySiteUrl,
} = require("../repositories/site");

// Getting Site
router.get("/:siteUrl", getSiteBySiteUrl, renderSitePage);

// Getting All Sites
router.get("/", async(req, res) => {
    const sites = await getAllSites();
    res.send(sites);
});

// Creating one
router.post("/", addNewSite);

// Deleting Site
router.delete("/:siteUrl", deleteSiteBySiteUrl, (req, res) => {
    // const main_page = `${req.protocol}://${req.get("host")}/main_page`;

    if (res.deletedCount < 1) {
        console.log('before send not delete');
        res.send(`<script>alert("Cant Delete The Site");</script >`);
    } else {
        console.log('before send delete');
        res.send(
            `<script>alert("Successfully Deleted Site");</script >`
        );
    }
});

// Delete all table
router.delete("/", async(req, res) => {
    try {
        deleteAll();
        res.json({ message: "Deleted sites" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router