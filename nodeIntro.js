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

//check for --out in command-line args, if so, take the next argument and use that as the path to write to

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// check to see if path is url or not, then decide webCat vs cat

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
