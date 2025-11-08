const queries = require("../models/OfferingsQueries")

async function getAll() {
    return await queries.getAllQuery() 
}

async function getOne(req, res) {
   const id = req.params["id"] 
   return await queries.getOneQuery(id) 
}

async function deleteCourseOffering(req, res) {
    const id = req.params["id"]
    queries.deleteCourseOfferingQuery(id)
}

async function createCourseOffering(req, res) {
    //TODO validation/processing
    queries.createOneQuery(req.body)
}

async function updateCourseOffering(req, res) {
    try {
        queries.updateOneQuery(req.body)
    } catch (e) {
        console.log(e.stack)
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Something went wrong',
        })
    }
}

module.exports = {
    getOne,
    getAll,
    deleteCourseOffering,
    createCourseOffering,
    updateCourseOffering
}