const express = require("express");
const db = require("./models/index");
const cors = require("cors");
const ExcelJS = require("exceljs");
const bodyParser = require("body-parser");
const promBundle = require("express-prom-bundle");
const logger = require("./config/logger");
const dirTree = require("directory-tree");
const fs = require("fs");

require("dotenv").config();

const API_TOKEN = process.env.API_TOKEN;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    promClient: {
      collectDefaultMetrics: {},
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://parks.shicks255.com"],
  })
);

app.use(bodyParser.json());

const tree = dirTree("./outlineData/");
console.log(tree);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Dropping and re-syncing db.");

  const natParkSheet = new ExcelJS.Workbook();
  natParkSheet.xlsx.readFile("./natParks.xlsx").then((book) => {
    const sheet = book.worksheets[0];
    const rowCount = sheet.actualRowCount;
    for (let i = 2; i < rowCount; i++) {
      let row = sheet.getRow(i);
      const parkName = row.getCell(1);
      const code = row.getCell(2);
      const id = row.getCell(3);
      const type = row.getCell(4);
      const state1 = row.getCell(5);
      const state2 = row.getCell(6);
      const lat = row.getCell(7);
      const long = row.getCell(8);

      const geoJsonFilePath = tree.children.find(
        (s) => s.name.slice(0, 4) === code.value.toLowerCase()
      );
      console.log(geoJsonFilePath);

      if (
        type.value &&
        type.value.length > 0 &&
        code.value &&
        code.value.length > 0
      ) {
        const newPark = {
          name: parkName.value,
          code: code.value,
          type: type.value,
          state: state1.value,
          latitude: lat.value,
          longitude: long.value,
        };

        if (geoJsonFilePath) {
          const geoJsonRaw = fs.readFileSync(geoJsonFilePath.path);
          const geoJson = JSON.parse(geoJsonRaw);
          let coords = geoJson?.geometry?.coordinates;
          if (!coords) {
            coords = geoJson?.features[0]?.geometry?.coordinates;
          }
          newPark.outline =
            coords.length > 1
              ? JSON.stringify(coords)
              : JSON.stringify(coords[0]);
        }

        db.park.create(newPark).catch((e) => {
          console.log(e);
        });
      }
    }
  });

  const arches = {
    name: "Arches National Park",
    type: "PARK",
    state: "UT",
    latitude: 38.70791763,
    longitude: -109.595456,
  };

  const bryce = {
    name: "Bryce Canyon National Park",
    type: "PARK",
    state: "UT",
    latitude: 37.58399144,
    longitude: -112.1826689,
  };

  const zion = {
    name: "Zion National Park",
    type: "PARK",
    state: "AZ",
    latitude: 37.318099,
    longitude: -113.029996,
  };
  // db.park.create(bryce);
  // db.park.create(arches);
  // db.park.create(zion);

  // const newUser = {
  //   id: 1,
  //   userName: "shicks255",
  // };
  // db.user.create(newUser);

  // const userVisit = {
  //   userId: 1,
  //   parkId: 1,
  //   visited: "10/3/2021",
  //   comment: "Good Times",
  //   rating: 4.0,
  // };
  // db.user_visit.create(userVisit);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server" });
  logger.info("Server processed a hello message", { latency: 2500 });
});

app.get("/api/parks", (req, res) => {
  const start = new Date().getTime();
  logger.info("Request", { path: "/api/parks", method: "GET", stage: "start" });
  db.park
    .findAll({
      attributes: [
        "id",
        "name",
        "code",
        "type",
        "state",
        "latitude",
        "longitude",
      ],
    })
    .then((data) => {
      res.json(data);
      const latency = new Date().getTime() - start;
      logger.info("Response", {
        path: "/api/parks",
        method: "GET",
        stage: "end",
        latency: latency,
        result: data.slice(0, 3),
      });
    });
});

app.get("/api/parks/:parkId", (req, res) => {
  const { parkId } = req.params;
});

app.get("/api/parks/outline/:parkId", (req, res) => {
  const { parkId } = req.params;
  db.park
    .findOne({
      where: { code: parkId },
      attributes: ["outline"],
    })
    .then((data) => {
      const parsed = JSON.parse(data.outline);

      const outlineFinal = parsed.map((x) => {
        if (x.length > 2) {
          return x.map((xx) => [xx[1], xx[0]]);
        }
        return [x[1], x[0]];
      });

      res.json(outlineFinal);
      console.log(parsed);
    });
});

app.get("/api/parkDetails/:parkId", (req, res) => {
  const { parkId } = req.params;
  const start = new Date().getTime();
  logger.info("Request", {
    path: "/api/parks",
    args: { parkId: "`${parkId}`" },
    stage: "start",
  });
  const npsUrl = `https://developer.nps.gov/api/v1/parks?parkCode=${parkId}&api_key=${API_TOKEN}`;
  fetch(npsUrl).then((res) => {
    res.json().then((re) => {
      console.log(re);
    });
  });
});

app.get("/api/userVisit/:userId", (req, res) => {
  const { userId } = req.params;
  const start = new Date().getTime();
  logger.info("Request", {
    path: "/api/userVisits",
    method: "GET",
    args: { userId: `"${userId}"` },
    stage: "start",
  });

  db.user_visit.findAll({ userId: userId }).then((data) => {
    res.json(data);
    const latency = new Date().getTime() - start;
    logger.info("Response", {
      path: "/api/userVisit",
      method: "GET",
      stage: "end",
      latency: latency,
      result: data.slice(0, 3),
    });
  });
});

app.post("/api/userVisit", (req, res) => {
  const { userId } = req.params;
  const userVisit = req.body;
  const sanitizedVisit = {
    ...userVisit,
    rating: parseInt(userVisit.rating),
  };

  const start = new Date().getTime();
  logger.info("Request", {
    path: "/api/userVisits",
    method: "GET",
    args: { userId: `"${userId}"` },
    stage: "start",
  });

  db.user_visit.create(sanitizedVisit).then((data) => {
    console.log(data);
    const latency = new Date().getTime() - start;
    logger.info("Response", {
      path: "/api/userVisit",
      method: "GET",
      stage: "end",
      latency: latency,
      result: "test",
    });
  });

  // console.log(userId);
  console.log(userVisit);
});

app.get("/api/user/:userId", (req, res) => {
  const { userId } = req.params;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  logger.info(`Server started listening on port ${PORT}`);
});
