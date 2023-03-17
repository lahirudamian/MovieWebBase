const db = require("../models");
const Movie = db.Movies;
const Actor = db.Actors;
const Director = db.Directors;
const Production_company = db.Production_company;

// Create and Save a new Movie
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.company || !req.body.director || req.body.actors.length<1) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let dir;
  await Director.findById(req.body.director).then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Director with id " + id });
    else dir=data;
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Director with id=" + id });
  });

  

  let com;
  await Production_company.findById(req.body.company).then(data => {
    if (!data)
      res.status(404).send({ message: "Not found company with id " + id });
    else com=data;
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving company with id=" + id });
  });

  let actorsList = [];

  for (let i = 0; i < req.body.actors.length; i++) {
    const e = req.body.actors[i];
    await Actor.findById(e).then( data => {
        actorsList.push(data);
    })
  }


  // Create a Movie
  const movie = new Movie({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    published: req.body.published ? req.body.published : false,
    company:com,
    director:dir,
    actors:actorsList

  });

  // console.log(movie);

  // Save Movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie."
      });
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Movie.find(condition)
    .then(data => {

      for (let index = 0; index < data.length; index++) {
        const e = data[index];
        Production_company.findById(e.company).then(d1 => {
          e.company=d1;
        });
        Director.findById(e.director).then(d2 => {
          e.director=d2;
        });
        
      }


      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(async data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else {
        let dir;
  await Director.findById(data.director).then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Director with id " + req.body.director });
    else dir=data;
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Director with id=" + req.body.director });
  });

  

  let com;
  await Production_company.findById(data.company).then(data => {
    if (!data)
      res.status(404).send({ message: "Not found company with id " + req.body.company });
    else com=data;
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving company with id=" + req.body.company });
  });

  let actorsList = [];

  for (let i = 0; i < data.actors.length; i++) {
    const e = data.actors[i];
    await Actor.findById(e).then( d2 => {
        actorsList.push(d2);
    })
  }


  // Create a Movie
  const movie = {
    name: data.name,
    description: data.description,
    category: data.category,
    published: data.published,
    company:com,
    director:dir,
    actors:actorsList

  };

        res.send(movie);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id
      });
    });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      } else {
        res.send({
          message: "Movie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
};

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Movies."
      });
    });
};

// Find all published Movies
// exports.findAllPublished = (req, res) => {
//   Movie.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Movies."
//       });
//     });
// };
