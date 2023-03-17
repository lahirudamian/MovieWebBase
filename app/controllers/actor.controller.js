const db = require("../models");
const Actor = db.Actors;

// Create and Save a new Actor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Actor
  const actor = new Actor({
    name: req.body.name,
    age: req.body.age,
    startedCareer: req.body.startedCareer
  });

  // Save Actor in the database
  actor
    .save(actor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Actor."
      });
    });
};

// Retrieve all Actors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Actor.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Actors."
      });
    });
};

// Find a single Actor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Actor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Actor with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Actor with id=" + id });
    });
};

// Update a Actor by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Actor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Actor with id=${id}. Maybe Actor was not found!`
        });
      } else res.send({ message: "Actor was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Actor with id=" + id
      });
    });
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Actor.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Actor with id=${id}. Maybe Actor was not found!`
        });
      } else {
        res.send({
          message: "Actor was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Actor with id=" + id
      });
    });
};

// Delete all Actors from the database.
exports.deleteAll = (req, res) => {
  Actor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Actors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Actors."
      });
    });
};


