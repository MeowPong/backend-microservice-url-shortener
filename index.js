require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dns = require("dns");
const { URL } = require("url");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const urlArr = [];
let countUrl = 1;

app.post("/api/shorturl", (req, res) => {
  const originalURL = req.body.url;

  let hostname;
  try {
    const urlObj = new URL(originalURL);
    hostname = urlObj.hostname;

    if (!/^https?:\/\//.test(originalURL)) {
      return res.json({ error: "invalid url" });
    }
  } catch (err) {
    return res.json({ error: "invalid url" });
  }

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid url" });
    } else {
      const isExist = urlArr.find((entry) => entry.url === originalURL);
      if (isExist) {
        return res.json({
          original_url: isExist.url,
          short_url: isExist.key,
        });
      } else {
        const newEntry = {
          key: countUrl,
          url: originalURL,
        };
        urlArr.push(newEntry);
        countUrl++;

        return res.json({
          original_url: newEntry.url,
          short_url: newEntry.key,
        });
      }
    }
  });
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existShortUrl = urlArr.find((e) => e.key === id);

  if (existShortUrl) {
    res.redirect(existShortUrl.url);
  } else {
    res.json({ error: "invalid url" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
