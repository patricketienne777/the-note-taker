// const router = require("express").Router()
// const fs =require("fs")
// router.delete("/api/notes/:itemid",(req,res) => {

// })
// router.post("/", (req, res) => {
//    const readFile = fs.readFileSync("db/db.json").toString()
//    let json = JSON.parse(readFile)
//    console.log(req.body)
//    console.log(json)
//    json.push(req.body)
   
//    fs.writeFileSync("db/db.json", JSON.stringify(json))
//     //Read file & use request.body to add info to my data
//     // after use fs.write file to save new data
// }
// ) 
// router.get("/", (req, res)=> {

// fs.readFile("db/db.json","utf8", (err, data)=> {
//     if (err) throw err
//     let parseData 

//     try {
//         parseData = [].concat(JSON.parse(data))
//     } catch (error) {
//         parseData = []
//     } 
//     return res.json(parseData)
// })



// })

// module.exports = router

const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db/db.json");

// DELETE route to remove a note by ID
router.delete("/api/notes/:itemid", (req, res) => {
  // Read the existing data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    // Parse the JSON data
    let json = JSON.parse(data);

    // Find the index of the note with the given ID
    const index = json.findIndex((note) => note.id === req.params.itemid);

    // If the note is found, remove it
    if (index !== -1) {
      json.splice(index, 1);

      // Save the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(json), (err) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });
});

// POST route to create a new note
router.post("/", (req, res) => {
  // Read the existing data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    // Parse the JSON data
    let json = JSON.parse(data);

    // Generate a unique ID for the new note (you can use a library like uuid for this)
    const newNote = {
      id: Date.now().toString(), // Using a timestamp as an example
      title: req.body.title,
      text: req.body.text,
    };

    // Add the new note to the array
    json.push(newNote);

    // Save the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(json), (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json(newNote);
    });
  });
});

// GET route to retrieve all notes
router.get("/", (req, res) => {
  // Read the data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    // Parse the JSON data
    let parseData;

    try {
      parseData = JSON.parse(data);
    } catch (error) {
      parseData = [];
    }

    return res.json(parseData);
  });
});

module.exports = router;
