const queries = require("../models/OfferingsQueries")
async function getCourseOfferings(req, res) {
   const id = req.params["id"] 
   queries.getCourseOfferingsQuery(id) 
}

async function deleteCourseOfferings(req, res) {

}

async function createCourseOffering(req, res) {

}

async function updateCourseOffering(req, res) {

}

module.exports = {
    getCourseOfferings
}