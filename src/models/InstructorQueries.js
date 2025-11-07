const pool = require("../models/Pool")
async function getOne(id) {
  const getOneSQL = `
    SELECT * FROM instructors 
      WHERE instructors_id = $1;
  `
  await pool.query(getOneSQL, [id])
}

async function getAll() {
  const getAllSQL = `
    SELECT * FROM instructors;
  `
  
  await pool.query(getAllSQL)
}

async function createOne() {
  
}

async function deleteOne(id) {
  const getOneSQL = `
    DELETE * FROM instructors 
      WHERE instructors_id = $1;
  `
  await pool.query(getOneSQL, [id])
}

async function updateOne(id) {
  const updateOneSQL = `
    UPDATE instructors
      WHERE instructors_id = $1
  `
  await
}

module.exports = {
  getOne,
  getAll,
  createOne,
  deleteOne,
  updateOne
}