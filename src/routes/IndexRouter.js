const { Router } = require("express");

const indexRouter = Router();
const courseController = require("../controllers/CoursesController");

indexRouter.get("/", async (req, res) =>
  res.render("./courses/courses", {
    courses: await courseController.getAllCourses(req, res),
    addURL: "courses/add",
  })
);

module.exports = indexRouter;
