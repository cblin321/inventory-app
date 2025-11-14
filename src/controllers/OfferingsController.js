const queries = require("../models/OfferingsQueries")

async function getAll() {
    return await queries.getAllQuery() 
}

async function getOne(req, res) {
   const id = req.params["id"] 
   const rows = await queries.getOneQuery(id)
   if (rows.length == 0)
        console.log("no rows!")
   const removeSeconds = time => time.slice(0, 5)
    return rows.map(row => {
        return {
            ...row,
            offering_time_start: removeSeconds(row.offering_time_start),
            offering_time_end: removeSeconds(row.offering_time_end),
        }
    })
}

async function deleteCourseOffering(req, res) {
    const id = req.params["id"]
    console.log(id)
    await queries.deleteCourseOfferingQuery(id)
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