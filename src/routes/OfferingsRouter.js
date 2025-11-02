const { Router } = require("express")

const offeringsController = require("../controllers/OfferingsController")

const offeringsRouter = Router()


offeringsRouter.get("offerings/:id", async (req, res) => {

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

module.exports = offeringsRouter