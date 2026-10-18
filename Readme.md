# Week06 Exercise - Notes Application

A simple RESTful CRUD API for a note-taking application, built with Node.js, Express and MongoDB Atlas.

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Installation

```bash
npm install
```

## MongoDB Configuration

Copy `.env.example` to `.env` and add your MongoDB Atlas connection string:

```
DB_URL=mongodb+srv://<db_user>:<db_password>@<cluster-host>/week06_notes?retryWrites=true&w=majority
PORT=8081
```

The `.env` file is not uploaded to GitHub.

## Run Server

```bash
npm start
```

The server runs at <http://localhost:8081>

## API Endpoints

| Method | URL | Description |
| ------ | --- | ----------- |
| GET | `/` | Welcome message |
| POST | `/notes` | Create a new note |
| GET | `/notes` | Get all notes |
| GET | `/notes/:noteId` | Get one note |
| PUT | `/notes/:noteId` | Update a note |
| DELETE | `/notes/:noteId` | Delete a note |

Priority can be `HIGH`, `MEDIUM` or `LOW`.

The Postman collection is in `Notes-API.postman_collection.json`.

## Sample Note Payload

```json
{
    "content" : {
        "noteTitle": "Sample Note Title",
        "noteDescription": "Sample Note Description",
        "priority": "HIGH",
        "dateAdded": "06/Oct/2025",
        "dateUpdated": "06/Oct/2025"
    }
}
```

## GitHub Repository

<https://github.com/Cem-Gbc/101496484_COMP3123-exec06>
