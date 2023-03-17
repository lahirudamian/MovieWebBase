const { Directors } = require("../models");
const db = require("../models");
const Director = db.Directors;

// Create and Save a new Director
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Director
  const director = new Directors({
    name: req.body.name,
    address: req.body.address,
    numberOfFilmsDirected: req.body.numberOfFilmsDirected,
  });

  // Save Director in the database
  director
    .save(director)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Director."
      });
    });
};

// Retrieve all Directors from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Director.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Directors."
      });
    });
};

// Find a single Director with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Director.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Director with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Director with id=" + id });
    });
};

// Update a Director by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Director.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Director with id=${id}. Maybe Director was not found!`
        });
      } else res.send({ message: "Director was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Director with id=" + id
      });
    });
};

// Delete a Director with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Director.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Director with id=${id}. Maybe Director was not found!`
        });
      } else {
        res.send({
          message: "Director was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Director with id=" + id
      });
    });
};

// Delete all Directors from the database.
exports.deleteAll = (req, res) => {
  Director.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Directors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Directors."
      });
    });
};


