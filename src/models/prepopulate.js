const pool = require("../models/Pool");
const schema = `
    CREATE TABLE IF NOT EXISTS courses (
        course_number TEXT PRIMARY KEY,
        course_name TEXT
    );

    CREATE TABLE IF NOT EXISTS subjects (
        subject_name TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS courses_belong_to_subjects (
        course_number TEXT REFERENCES courses(course_number) ON DELETE CASCADE ON UPDATE CASCADE,
        subject_name TEXT REFERENCES subjects(subject_name) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS offerings (
        offering_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        offering_time_start TIME,
        offering_time_end TIME,
        year INTEGER,
        semester TEXT,
        capacity INTEGER,
        num_enrolled INTEGER,
        course_number TEXT REFERENCES courses(course_number) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS professors (
        prof_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        rating REAL,
        name TEXT
    );

    CREATE TABLE IF NOT EXISTS professors_teach_offerings (
        prof_id INTEGER REFERENCES professors(prof_id),
        offering_id INTEGER REFERENCES offerings(offering_id)
    );
`;

const courseSQL = `
    INSERT INTO courses (
        course_number,
        course_name
    ) 
    VALUES 
    (
        'CS 620',
        'Capstone Project'
    ),
    (
        'CS 101',
        'Programming I' 
    )
    RETURNING course_number;
`;
const profSQL = `
    INSERT INTO professors (
        rating,
        name
    )
    VALUES 
    (
        4.5, 
        'John Smith'
    ),
    (
        3.2,
        'Meena Carolina'
    ),
    (
        2.5,
        'Bi Li'
    )
    RETURNING prof_id;
`;
const profOfferingsRelationSQL = `
    INSERT INTO professors_teach_offerings (
        prof_id,
        offering_id
    )
    VALUES
    (
        $1,
        $2
    );
`;
const courseSubjectRelationSQL = `
    INSERT INTO courses_belong_to_subjects (
        course_number,
        subject_name
    )
    VALUES
    (
        $1,
        $2
    ), 
    (
        $3,
        $4
    );
`;

const offeringSQL = `
    INSERT INTO offerings (
        offering_time_start,
        offering_time_end,
        year,
        semester,
        capacity,
        num_enrolled,
        course_number
    )
    VALUES 
    (
        '17:30',
        '19:30',
        2025,
        'FALL',
        200,
        150,
        $1
    ),

    (
        '19:30',
        '20:30',
        2025,
        'SPRING',
        100,
        50,
        $2
    ),

    (
        '14:00',
        '15:15',
        2025,
        'FALL',
        30,
        30,
        $3
    )
    RETURNING offering_id;
`;
const subjectSQL = `
    INSERT INTO subjects (
        subject_name
    )
    VALUES
        ('MATH'),
        ('PHYSICS'),
        ('COMPUTER SCIENCE');
`;

function listFromRows(rows, col) {
  return rows.map((row) => row[col]);
}

async function main() {
  const pool = require("./Pool");
  const initTables = await pool.query(schema);
  const courseQuery = await pool.query(courseSQL);
  const courseNumber = listFromRows(courseQuery.rows, "course_number");


  const subjectQuery = await pool.query(subjectSQL);
  const subjectId = listFromRows(subjectQuery.rows, "subject_id");

  const offeringCourseNum = ["CS 620", "CS 620", "CS 101"];
  const offeringQuery = await pool.query(offeringSQL, offeringCourseNum);
  const offeringId = listFromRows(offeringQuery.rows, "offering_id");

  const profQuery = await pool.query(profSQL);
  const profId = listFromRows(profQuery.rows, "prof_id");

  const profOfferingsRelationQuery = await pool.query(
    profOfferingsRelationSQL,
    [profId[0], offeringId[0]]
  );

  const courseSubjectRelationQuery = await pool.query(
    courseSubjectRelationSQL,
    ["CS 620", "COMPUTER SCIENCE", "CS 101", "COMPUTER SCIENCE"]
  );
}

main();
