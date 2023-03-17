const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Movies = require("./movie.model.js")(mongoose);
db.Directors = require("./director.model.js")(mongoose);
db.Actors = require("./actor.model.js")(mongoose);
db.Production_company = require("./production_company.model")(mongoose);
module.exports = db;
