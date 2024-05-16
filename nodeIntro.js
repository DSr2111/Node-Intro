const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleOut(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf-8", function (err) {
      if (err) {
        console.error(`Couldn't wrote ${out}: ${err}`);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOut(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    handleOut(res.data, out);
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

// check to see if path is url or not, then decide webCat vs cat

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
