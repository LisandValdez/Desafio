const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Archive note
router.patch("/:id/archive", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Error archiving the note" });
  }
});

// Unarchive note
router.patch("/:id/unarchive", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { archived: false },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Error unarchiving the note" });
  }
});

module.exports = router;
