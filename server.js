require('dotenv').config();
const path = require("path");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {addSites} = require('./addSites');
const {renderMainPage} = require("./handlers/mainPageRendler")
const {renderExmpleSite} = require("./handlers/exmpleSiteRendler")
const {renderaddSite} = require("./handlers/addSiteRendler")

const sitesRoutes = require("./routes/sites");



const port = 5500;

mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error' , (error) => console.error(error));
db.once('open' , () => console.log('connected to Database'));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// const subscribersRouter = require('./routes/subscribers');
// app.use('/subscribers' , subscribersRouter);

// to init the sites from JSON to DB
app.post("/init" , addSites);

app.get("/main_page", renderMainPage);
app.get("/exmple_site", renderExmpleSite);
app.get("/add_site", renderaddSite);
app.use("/sites", sitesRoutes, express.static(path.join(__dirname, "public")));



app.get("/health_check", (req, res) => {
  res.send("OK");
});

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}/main_page`)
);