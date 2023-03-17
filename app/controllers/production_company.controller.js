
const db = require("../models");
const Production_company = db.Production_company;

// Create and Save a new Production_company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Production_company
  const company = new Production_company({
    name: req.body.name,
    address: req.body.address,
    started: req.body.started
  });

  // Save Production_company in the database
  company
    .save(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Production_company."
      });
    });
};

// Retrieve all Production_company from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Production_company.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Production_company."
      });
    });
};

// Find a single Production_company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Production_company.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Production_company with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Production_company with id=" + id });
    });
};

// Update a Production_company by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Production_company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Production_company with id=${id}. Maybe Production_company was not found!`
        });
      } else res.send({ message: "Production_company was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Production_company with id=" + id
      });
    });
};

// Delete a Production_company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Production_company.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Production_company with id=${id}. Maybe Production_company was not found!`
        });
      } else {
        res.send({
          message: "Production_company was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Production_company with id=" + id
      });
    });
};

// Delete all Production_company from the database.
exports.deleteAll = (req, res) => {
  Production_company.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Production_company were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Production_company."
      });
    });
};

// Find all published Production_company
// exports.findAllPublished = (req, res) => {
//   Production_company.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Production_company."
//       });
//     });
// };
