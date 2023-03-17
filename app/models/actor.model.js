module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      age: String,
      startedCareer: Date,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Actor = mongoose.model("actor", schema);
  return Actor;
};
