const mercadopago = require("mercadopago");

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

module.exports = mercadopago;
