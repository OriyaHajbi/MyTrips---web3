const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    siteUrl: { type: String, required: true },
    siteName: { type: String, required: true },
    pictures: [{ type: String, required: true }],
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    canBeDeleted: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('site' , siteSchema)