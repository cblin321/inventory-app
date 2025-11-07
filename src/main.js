const express = require("express")
const path = require("path")

const app = express()
const indexRouter = require("./routes/IndexRouter")
const courseRouter = require("./routes/CourseRouter")
const offeringRouter = require("./routes/OfferingsRouter")

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.listen(3000, (err) => {
    if (err)
        throw err
})

app.use("/", indexRouter)
app.use("/courses", courseRouter)
app.use("/offerings", offeringRouter)