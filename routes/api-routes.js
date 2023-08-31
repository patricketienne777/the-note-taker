const router = require("express").Router()
const fs =require("fs")
router.get("/notes", (req, res)=> {

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