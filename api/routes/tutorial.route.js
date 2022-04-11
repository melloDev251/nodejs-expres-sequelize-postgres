const { Router } = require("express");

module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");

  var router = require("express").Router();

  // create new tutorial
  router.post("/", tutorials.create);

  // retrieve all tutorials
  router.get("/", tutorials.findAll);

  // retrieve all publishied tutorials
  router.get("/published", tutorials.findAllPublished);

  // retrieve a single tutorial in id
  router.get("/:id", tutorials.findOne);

  // update a tutorial with id
  router.put("/:id", tutorials.update);

  // delete a tutorial with id
  router.delete("/:id", tutorials.delete);

  // delete all tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
