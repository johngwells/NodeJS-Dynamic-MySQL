const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// test
// db.execute('SELECT * FROM products').then(data => {
//   console.log(data[0])
// }).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// sync's your models to the database which creates the tables/relations
sequelize
  .sync()
  .then((results) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));


