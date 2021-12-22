const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

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

// use middleware to use the new 'user' data
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Relations
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});

// Add multiple products
User.hasMany(Product);

// sync's your models to the database which creates the tables/relations

/* sync({ force: true }) for development (not in production)
to overwrite the tables to reflect the new changes. Incase
you've created multiple models after the db was created.
then turn off. */

// app.listen does not fire until after sequelize (below)
// initializes. then the code above is fired. So the middleware
// can execute without any problems
sequelize
  // .sync({ force: true })
  .sync()
  .then((results) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Jonny", email: "j@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
