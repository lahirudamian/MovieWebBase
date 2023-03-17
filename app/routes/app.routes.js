module.exports = app => {
  const movies = require("../controllers/movie.controller.js");
  const actors = require("../controllers/actor.controller.js");
  const directors = require("../controllers/director.controller.js");
  const Production_company = require("../controllers/production_company.controller.js");
  

  var router = require("express").Router();

  // Movie related routes
  router.post("/movies/", movies.create);
  router.get("/movies/", movies.findAll);
  router.get("/movies/:id", movies.findOne);
  router.put("/movies/:id", movies.update);
  router.delete("/movies/:id", movies.delete);
  router.delete("/movies/", movies.deleteAll);

  // Actors related routes
  router.post("/actors/", actors.create);
  router.get("/actors/", actors.findAll);
  router.get("/actors/:id", actors.findOne);
  router.put("/actors/:id", actors.update);
  router.delete("/actors/:id", actors.delete);
  router.delete("/actors/", actors.deleteAll);

   // Director related routes
   router.post("/directors/", directors.create);
   router.get("/directors/", directors.findAll);
   router.get("/directors/:id", directors.findOne);
   router.put("/directors/:id", directors.update);
   router.delete("/directors/:id", directors.delete);
   router.delete("/directors/", directors.deleteAll);

  // Production company related routes
   router.post("/company/", Production_company.create);
   router.get("/company/", Production_company.findAll);
   router.get("/company/:id", Production_company.findOne);
   router.put("/company/:id", Production_company.update);
   router.delete("/company/:id", Production_company.delete);
   router.delete("/company/", Production_company.deleteAll);

  app.use("/api", router);
};
