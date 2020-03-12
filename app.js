require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var mercadopago = require("mercadopago");
var app = express();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/detail", async (req, res) => {
  const { title, price, unit } = req.query;
  let preference = {
    items: [
      {
        title,
        unit_price: Number(price),
        quantity: Number(unit)
      }
    ],
    notification_url:
      "https://webhook.site/ac6ca1d5-9f9b-47d8-9766-60c19220ad3b"
  };

  const {
    body: { id: prefID }
  } = await mercadopago.preferences.create(preference);

  res.render("detail", { ...req.query, prefID });
});

app.post((req, res) => {});

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:3000`);
});
