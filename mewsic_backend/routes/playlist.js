const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    Playlist.create(playlistData)
      .then((playlist) => res.status(200).json(playlist))
      .catch((err) => res.status(500).json({ err: "Server error" }));
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const playlistId = req.params.playlistId;
    Playlist.findOne({ _id: playlistId })
      .then((playlist) => {
        if (!playlist) {
          return res.status(301).json({ err: "Invalid ID" });
        }
        return res.status(200).json(playlist);
      })
      .catch((err) => res.status(500).json({ err: "Server error" }));
  }
);

router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const artistId = req.user._id;
    Playlist.find({ owner: artistId })
      .populate("owner")
      .then((playlists) => res.status(200).json({ data: playlists }))
      .catch((err) => res.status(500).json({ err: "Server error" }));
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const artistId = req.params.artistId;
    User.findOne({ _id: artistId })
      .then((artist) => {
        if (!artist) {
          return res.status(304).json({ err: "Invalid Artist ID" });
        }
        Playlist.find({ owner: artistId })
          .then((playlists) => res.status(200).json({ data: playlists }))
          .catch((err) => res.status(500).json({ err: "Server error" }));
      })
      .catch((err) => res.status(500).json({ err: "Server error" }));
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    Playlist.findOne({ _id: playlistId })
      .then((playlist) => {
        if (!playlist) {
          return res.status(304).json({ err: "Playlist does not exist" });
        }
        if (
          !playlist.owner.equals(currentUser._id) &&
          !playlist.collaborators.includes(currentUser._id)
        ) {
          return res.status(400).json({ err: "Not allowed" });
        }
        Song.findOne({ _id: songId })
          .then((song) => {
            if (!song) {
              return res.status(304).json({ err: "Song does not exist" });
            }
            playlist.songs.push(songId);
            playlist
              .save()
              .then((updatedPlaylist) => res.status(200).json(updatedPlaylist))
              .catch((err) => res.status(500).json({ err: "Server error" }));
          })
          .catch((err) => res.status(500).json({ err: "Server error" }));
      })
      .catch((err) => res.status(500).json({ err: "Server error" }));
  }
);

module.exports = router;
