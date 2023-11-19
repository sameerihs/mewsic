const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
//
const app = express();
const port = 8000;
app.use(express.json());

console.log(process.env);

mongoose
  .connect(
    "mongodb+srv://flyinlemon03:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.ow5kkv9.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log(err);
  });

//
//

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisIsSupposedToBeSecret";

passport.use(
  JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    }).then();
  })
);
//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port" + port);
});
