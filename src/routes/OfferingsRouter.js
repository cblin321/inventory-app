const { Router } = require("express")

const offeringsController = require("../controllers/OfferingsController")

const offeringsRouter = Router()


offeringsRouter.get("offerings/:id", async (req, res) => {

})

offeringsRouter.post("/offerings/add", async (req, res) => {

})

offeringsRouter.delete("/offerings/:id", async (req, res) => {

})

offeringsRouter.put("/offerings/:id", (req, res) => {

})

module.exports = offeringsRouter