const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      userName: String,
      email: String,
      password: String
    },
    { timestamps: true }
  );
  userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Auth = mongoose.model("auth", userSchema);
  return Auth;
}