const noteModel = require('../models/NotesModel.js');
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = express.Router();

// Send 400 if the note id is not a valid MongoDB ObjectId
function isValidId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({
            message: "Invalid note id " + id
        });
        return false;
    }
    return true;
}

// Send 400 for validation errors, otherwise 500
function sendError(err, res) {
    if (err.name === 'ValidationError') {
        return res.status(400).send({
            message: err.message
        });
    }
    res.status(500).send({
        message: err.message || "Some error occurred on the server"
    });
}

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    try {
        const note = new noteModel(req.body.content);
        const newNote = await note.save();
        res.status(201).send(newNote);
    } catch (err) {
        sendError(err, res);
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (err) {
        sendError(err, res);
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    const noteId = req.params.noteId;
    if (!isValidId(noteId, res)) return;

    try {
        const note = await noteModel.findById(noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + noteId
            });
        }
        res.status(200).send(note);
    } catch (err) {
        sendError(err, res);
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    const noteId = req.params.noteId;
    if (!isValidId(noteId, res)) return;

    try {
        const noteData = req.body.content;
        // Use the current date if dateUpdated is not sent
        if (!noteData.dateUpdated) {
            noteData.dateUpdated = Date.now();
        }

        const note = await noteModel.findByIdAndUpdate(noteId, noteData, {
            new: true,
            runValidators: true
        });
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + noteId
            });
        }
        res.status(200).send(note);
    } catch (err) {
        sendError(err, res);
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidanddelete_findByIdAndDelete
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    const noteId = req.params.noteId;
    if (!isValidId(noteId, res)) return;

    try {
        // findByIdAndRemove was removed in Mongoose 8, so use findByIdAndDelete
        const note = await noteModel.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + noteId
            });
        }
        res.status(200).send({
            message: "Note deleted successfully",
            note: note
        });
    } catch (err) {
        sendError(err, res);
    }
});

module.exports = noteRoutes;
