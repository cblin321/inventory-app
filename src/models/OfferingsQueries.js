const pool = require("../models/Pool")

async function getOneQuery(id) {
  const getOfferingsSQL = `
    SELECT * FROM offerings
      JOIN courses ON courses.course_number = offerings.course_number
      WHERE offering_id = $1;
  `

  return (await pool.query(getOfferingsSQL, [id])).rows;
}

async function getAllQuery() {
  const getAllSQL = `
    SELECT * FROM offerings;
  `;

  return (await pool.query(getAllSQL)).rows;
}

async function deleteCourseOfferingQuery(id) {
  const deleteOfferingsSQL = `
    DELETE FROM offerings 
      WHERE offerings.offering_id = $1; 
      `;

  await pool.query(deleteOfferingsSQL, [id]);
}

async function createOneQuery(row) {
  const addOfferingSQL = `
    INSERT INTO offerings
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
  `;
  const { start, end, year, sem, cap, enrolled, course_num } = row;

  await pool.query(addOfferingSQL, [
    start,
    end,
    year,
    sem,
    cap,
    enrolled,
    course_num,
  ]);
}

async function updateOneQuery(row) {
  const { start, end, year, sem, cap, num_enrolled, course_number } = row
  const updateOfferingSQL = `
    UPDATE offerings 
      SET offering_time_start = $1, offering_time_end = $2,
      year = $3, semester = $4, capacity = $5, num_enrolled = $6
  `;


  await pool.query(updateOfferingSQL, [ start, end, year, sem, cap, num_enrolled, ])
}

module.exports = {
  getOneQuery,
  getAllQuery,
  deleteCourseOfferingQuery,
  createOneQuery,
  updateOneQuery,
};
