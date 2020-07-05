const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Karen:Aloha98@cluster0-rzcxc.mongodb.net/Nutricion?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log("Database is conected"))
  .catch((err) => console.log(err));
