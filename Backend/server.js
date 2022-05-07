const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/userRoute");
const propertyRoute = require("./src/routes/propertyRoute");
const reportRoute = require("./src/routes/reportRoute");
const ratingRoute = require("./src/routes/ratingRoute");
const reviewRoute = require("./src/routes/reviewRoute");
const appointmentRoute = require("./src/routes/appointmentRoute");
const favoriteRoute = require("./src/routes/favoriteRoute");
const roommateFinderRoute = require("./src/routes/roommateFinderRoute");
const db = require("./src/models");

const passport = require("passport");
const path = require("path");
const fs = require("fs");

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://easyhousingapi.herokuapp.com",
    "https://easy-housing-web.herokuapp.com",
  ],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();
app.use(passport.initialize());
app.use("/src/images", express.static(path.join(__dirname, "src/images")));

require("./src/middleware/passport")(passport);
//Routes
const serviceRouter = require("./src/routes/serviceRoute");
app.use("/api/services", serviceRouter);

app.use("/api/users", userRoute);

app.use("/api/properties", propertyRoute);

app.use("/api/roomatefinder",roommateFinderRoute);
app.use("/api/reports/", reportRoute);

app.use("/api/ratings", ratingRoute);

app.use("/api/reviews", reviewRoute);

app.use("/api/appointments", appointmentRoute);

app.get("/image/:name", async (req, res) => {
  try {
    const fileName = req.params.name;

    const filePath = path.join("images", fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Image at path images/${fileName} does not exist.`);
    }

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.log(error.message);
    res.status(404).send("Image not found.");
  }
});
app.use("/api/favorites", favoriteRoute);

// app.use((req, res, next) => {
//   res.status(404).send({
//     status: 404,
//     error: "Please Enter Correct Route, Current Route Not found",
//   });
// });

db.sequelize.sync().then(() => {
  const listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
