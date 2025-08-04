const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// HTML form to upload a file
app.get('/', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="myFile">
            <input type="submit" value="Upload File">
        </form>
    `);
});

// Handle file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded: ${req.file.filename}`);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});