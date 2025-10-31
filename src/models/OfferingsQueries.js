const pool = require("../models/Pool")

async function getCourseOfferingsQuery(id) {
  const getOfferingsSQL = `
    SELECT * FROM offerings
      WHERE offering_id = $id
      JOIN courses ON courses.course_id = offerings.course_id;
  `

  await pool.query(getOfferingsSQL, [id])
}

async function deleteCourseOfferings(id) {
  const deleteOfferingsSQL = `
    DELETE FROM offerings 
      WHERE offerings.offering_id = $1; 
      `

    await pool.query(deleteOfferingsSQL, [id])
}

module.exports = {
  getCourseOfferingsQuery
}