const {
  Schema,
  model
} = require("mongoose");

const userSchema = new Schema({
  tipo: String,
  email: String,
  password: String,
  nombre: String,
  apPat: String,
  apMat: String
}, {
  timestamps: true,
});

module.exports = model("User", userSchema);