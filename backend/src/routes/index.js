const {
  Router
} = require("express");
const router = Router();
const md5 = require("md5");

const User = require("../models/Users");

const jwt = require("jsonwebtoken");

router.post("/registro", async (req, res) => {
  const {
    tipo,
    email,
    password,
    nombre,
    apPat,
    apMat
  } = req.body;
  const newUser = new User({
    tipo: tipo,
    email: email,
    password: md5(password),
    nombre: nombre,
    apPat: apPat,
    apMat: apMat
  });
  await newUser.save();
  const token = jwt.sign({
    _id: newUser.id
  }, "secretKey");
  res.status(200).json({
    token
  });
});

router.get('/obtener', (req, res, next) => {
  User.find((err, registro) => {
    if (err) return next(err);
    res.json(registro);
  });
});

router.get('/obtener/id', verifyToken, async (req, res, next) => {
  const id = req.userId;
  await User.find({
    _id: id
  }, (err, registro) => {
    if (err) return next(err);
    res.status(200).json(registro);
  });
});

router.post("/login", async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email
  });
  if (!user) return res.status(401).send("El correo no existe");
  if (user.password !== md5(password))
    return res.status(401).send("Contraseña invalida");
  const token = jwt.sign({
    _id: user._id
  }, "secretKey");
  return res.status(200).json({
    token
  });
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauhtorized Request ???');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauhtorized Request llll');
  }

  const payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauhtorized Request');
  }
  req.userId = payload._id;
  next();
}

module.exports = router;