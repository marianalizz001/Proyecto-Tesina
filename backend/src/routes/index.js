const { Router } = require("express");
const router = Router();
const md5 = require("md5");

const User = require("../models/Users");

const jwt = require("jsonwebtoken");

router.post("/registro", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email: email, password: md5(password) });
  await newUser.save();
});

router.get("/private-tasks", verifyToken, (req, res) => {
  res.json([
    {
      _id: "1",
      name: "task one",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
    {
      _id: "2",
      name: "task two",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
    {
      _id: "3",
      name: "task three",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
  ]);
});

router.get("/tasks", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "task one",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
    {
      _id: "2",
      name: "task two",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
    {
      _id: "3",
      name: "task three",
      description: "asdadasd",
      date: "2019-11-06T15:50:18.921Z",
    },
  ]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("El correo no existe");
  if (user.password !== md5(password))
    return res.status(401).send("Contraseña invalida");
  const token = jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauhtorized Request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauhtorized Request");
  }

  const payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauhtorized Request");
  }
  req.userId = payload._id;
  next();
}

module.exports = router;
