const offeringsQueries = require("../models/OfferingsQueries")
async function getCourseOfferings(course) {
    await offeringsQueries.getOfferings()
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