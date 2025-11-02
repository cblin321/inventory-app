const { getAll } = require("../controllers/OfferingsController")
const pool = require("../models/Pool")

async function getOneQuery(id) {
  const getOfferingsSQL = `
    SELECT * FROM offerings
      WHERE offering_id = $id
      JOIN courses ON courses.course_id = offerings.course_id;
  `

  return (await pool.query(getOfferingsSQL, [id])).rows
}

async function getAllQuery() {
  const getAllSQL = `
    SELECT * FROM offerings;
  `

  return (await pool.query(getAllSQL)).rows
}


async function deleteCourseOfferingQuery(id) {
  const deleteOfferingsSQL = `
    DELETE FROM offerings 
      WHERE offerings.offering_id = $1; 
      `

    await pool.query(deleteOfferingsSQL, [id])
}

async function createOneQuery(row) {
  const addOfferingSQL = `
    INSERT INTO offerings
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
  `
  const { start, end, year, sem, cap, enrolled, course_num } = row

  await pool.query(addOfferingSQL, [start, end, year, sem, cap, enrolled, course_num])
}

async function updateOneQuery(row) {
//        offering_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//        offering_time_start TIME,
//        offering_time_end TIME,
//        year INTEGER,
//        semester TEXT,
//        capacity INTEGER,
//        num_enrolled INTEGER,
//        course_name INTEGER REFERENCES courses(course_name) ON DELETE CASCADE ON UPDATE CASCADE
  const { start, end, year, sem, cap, enrolled, number} = row
  const updateOfferingSQL = `
    UPDATE offerings 
      SET offering_time_start = $1, offering_time_end = $2,
      year = $3, semester = $4, capacity = $5, enrolled = $6
  `

  await pool.query(updateOfferingSQL, [ start, end, year, sem, cap, enrolled, course_num])
}

module.exports = {
  getOneQuery,
  getAllQuery,
  deleteCourseOfferingQuery,
  createOneQuery,
}