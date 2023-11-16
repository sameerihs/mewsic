const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/user");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    //incase we dont get
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ error: "Insufficient details to create song." });
    }

    const artist = req.user._id;
    const songDetails = {
      name,
      thumbnail,
      track,
      artist,
    };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

//get route
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    //Get All songs where artist id===currentUser ID
    const songs = await Song.find({ artist: req.user._id });
    return res.status(200).json({ data: songs });
  }
);

//Get All Songs by an Artist (Use ID)
router.get(
  "/get/artist",
  passport.authenticate(("jwt", { session: false })),
  async (req, res) => {
    const { artistId } = req.body;
    //Check if the artist exists first of all
    const artist = await User.find({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist Does not Exist" });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

//Get a Single Song

router.get(
  "/get/name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.body;
    //Check if the artist exists first of all
    const songExist = await Song.find({ name: songName });
    if (!songExist) {
      return res.status(301).json({ err: "Song Does not Exist" });
    }

    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);
module.exports = router;
