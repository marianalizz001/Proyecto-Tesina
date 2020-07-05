const { Router } = require("express");
const router = Router();

const User = require("../models/Users");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hello world"));

router.post("/registro", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser.id }, "secretKey");
  res.status(200).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("El correo no existe");
  if (user.password !== password)
    return res.status(401).send("Contraseña invalida");
  jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});
module.exports = router;
