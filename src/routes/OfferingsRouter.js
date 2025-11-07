const { Router } = require("express")

const offeringsController = require("../controllers/OfferingsController")

const offeringsRouter = Router()


offeringsRouter.get("offerings/:id", async (req, res) => {
  const offerings = offeringsController.getCourseOfferings(req, res)
  res.render("./offerings/offerings", { offerings })
})

offeringsRouter.post("/offerings/add", async (req, res) => {
  offeringsController.createCourseOffering(req, res)
  res.redirect("../")
})

offeringsRouter.delete("/offerings/:id", async (req, res) => {
  offeringsController.deleteCourseOffering(req, res)
  res.redirect("../")
})

offeringsRouter.put("/offerings/update/:id", (req, res) => {
  offeringsController.updateCourseOffering(req, res)
  res.redirect("../../")
})

module.exports = offeringsRouter