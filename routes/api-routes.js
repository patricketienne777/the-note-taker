const router = require("express").Router()
const fs =require("fs")
router.delete("/api/notes/:itemid",(req,res) => {

})
router.post("/", (req, res) => {
   const readFile = fs.readFileSync("db/db.json").toString()
   let json = JSON.parse(readFile)
   console.log(req.body)
   console.log(json)
   json.push(req.body)
   
   fs.writeFileSync("db/db.json", JSON.stringify(json))
    //Read file & use request.body to add info to my data
    // after use fs.write file to save new data
}
) 
router.get("/", (req, res)=> {

fs.readFile("db/db.json","utf8", (err, data)=> {
    if (err) throw err
    let parseData 

    try {
        parseData = [].concat(JSON.parse(data))
    } catch (error) {
        parseData = []
    } 
    return res.json(parseData)
})



})

module.exports = router