require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var mercadopago = require("mercadopago");
var app = express();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: "Mi producto",
      unit_price: 100,
      quantity: 1
    }
  ]
};

mercadopago.preferences
  .create(preference)
  .then(function(response) {
    // Este valor reemplazará el string "$$init_point$$" en tu HTML
    global.init_point = response.body.init_point;
  })
  .catch(function(error) {
    console.log(error);
  });

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/detail", function(req, res) {
  res.render("detail", req.query);
});

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:3000`);
});
