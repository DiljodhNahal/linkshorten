const express = require('express');
const validUrl = require('valid-url');

const router = express.Router();

const shortenedUrl = require('../models/shortenedUrl');

// Generate Code
function generateCode(length) {
  let potentialCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedCode = '';

  for (let i = 0; i < length; i++) {
    generatedCode += potentialCharacters.charAt(Math.floor(Math.random() * potentialCharacters.length));
  }

  return generatedCode;
}

// Create shortenedUrl
router.post('/shorten/*', async (req, res) => {
  if (!validUrl.isWebUri(req.params[0]))
    return res.status(400).json({message: "Invalid URL Parameter."})
  let generatedCode = await generateCode(8);
  await shortenedUrl.create({url: req.params[0], code:generatedCode}, function (error, created) {
    if (error)
      return res.status(500).json({message: error.message});
    return res.status(201).json({original: created.url, new: req.protocol + "://" + req.get('host') + "/" + created.code});
  });
});

// Get shortenedUrl
router.get("/:id", async (req, res) => {
  await shortenedUrl.findOne(({code: req.params.id})).then(function (url) {
    if (url)
      return res.redirect(url.url);
    res.status(404).json({ message: "Shortened URL not found." });
  });
});

module.exports = router;
