const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Konfiguracja folderu do zapisu plików
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Folder do zapisu
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Nazwa pliku
  }
});
const upload = multer({ storage: storage });

// Umożliwiamy dostęp do statycznych plików z folderu public
app.use(express.static('public'));

// Endpoint do uploadu plików
app.post('uploader.github.io//upload', upload.single('music'), (req, res) => {
  if (!req.file) return res.status(400).send('Nie przesłano pliku.');
  res.send(`Plik przesłany: ${req.file.filename}`);
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
