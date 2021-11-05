const express = require("express");
const db = require("./models/index");

const PORT = process.env.PORT || 3001;
const app = express();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Dropping and re-syncing db.");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.get("/api/parks", (req, res) => {
  const parks = [
    {
      name: "Zion National Park",
      state: {
        name: "Utah",
        abv: "AZ",
      },
      type: "National_Park",
      coords: [37.318099, -113.029996],
    },
  ];

  const newPark = {
    title: "Zion National Park",
    type: "National_Park",
    state: "AZ",
    latitude: 37.318099,
    longitude: -113.029996,
    outline: "sdf",
  };

  db.park.create(newPark).then((data) => {
    // console.log("saved data is ");
    // console.log(data);
    const parkx = db.park.findAll({}).then((data) => {
      console.log("fetched ");
      console.log(data[0]);
      res.json(data[0]);
    });
  });

  // console.log(parkx);

  // return res.json(parks);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
