module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      description: String,
      category: String,
      published: Boolean,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
      },
      director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director"
      },
      actors:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Actors"
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Movie = mongoose.model("movie", schema);
  return Movie;
};
