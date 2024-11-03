const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all Notes : GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log("Fetched user notes successfully");
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route 2: Add a new note : POST '/api/notes/addnote'. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      console.log("Note saved successfully");
      res.json(saveNote);
    } catch (error) {
      console.error("Error saving note:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Route 3: Update an Existing Note: PUT '/api/notes/updatenote/:id'. Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const updatenote = {};
    if (title) updatenote.title = title;
    if (description) updatenote.description = description;
    if (tag) updatenote.tag = tag;

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: updatenote }, { new: true });
    console.log("Note updated successfully");
    res.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route 4: Delete Existing Note: DELETE '/api/notes/deletenote/:id'. Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Delete the note
    await Note.findByIdAndDelete(req.params.id);
    console.log("Note deleted successfully");
    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
