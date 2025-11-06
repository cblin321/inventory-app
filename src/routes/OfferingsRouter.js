const { Router } = require("express")

const offeringsController = require("../controllers/OfferingsController")

const offeringsRouter = Router()

//testing endpoint
offeringsRouter.get("/", async (req, res) => {
    const offerings = await offeringsController.getAll()
    console.log(offerings)
    res.render("./offerings/offerings", { offerings })
})

offeringsRouter.post("/offerings/add", async (req, res) => {
    offeringsController.createCourseOffering(req, res)
})

offeringsRouter.get("/edit/:id", async (req, res) => {
    const offering = offeringsController.getOne(req, res)
    res.render("./courses/edit_offerings", { offering })
})

offeringsRouter.delete("/offerings/:id", async (req, res) => {
    offeringsController.deleteCourseOffering(req, res)
})

offeringsRouter.put("/offerings/:id", (req, res) => {
    offeringsController.updateCourseOffering(req, res)

})

offeringsRouter.get("/:id", async (req, res) => {
    const offerings = await offeringsController.getOne(req, res)
    res.render("./offerings/offerings", { offerings, updateURL: `/offerings/edit/${req.params.id}`})
})


module.exports = offeringsRouter