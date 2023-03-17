module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      address: String,
      numberOfFilmsDirected: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Director = mongoose.model("director", schema);
  return Director;
};
