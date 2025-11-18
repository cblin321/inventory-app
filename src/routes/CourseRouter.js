const { Router } = require("express");

const courseRouter = Router();
const coursesController = require("../controllers/CoursesController");
const offeringsController = require("../controllers/OfferingsController");

courseRouter.get("/", async (req, res) => {
  let allCourses = await coursesController.getAllCourses();
  console.log("root");
  res.render("./courses/courses", {
    courses: allCourses,
    addURL: "/courses/add/",
  });
});

courseRouter.get("/add", async (req, res) => {
  res.render("./courses/add_courses");
});

courseRouter.post("/add", async (req, res) => {
  await coursesController.addCourse(req, res);
  res.redirect("/courses")
});

courseRouter.get("/subjects/:id", async (req, res) => {});

courseRouter.delete("/delete/:id", async (req, res) => {
  coursesController.deleteCourse(req, res);
});

courseRouter.put("/edit/:id", async (req, res) => {
  coursesController.updateCourse(req, res);
});

courseRouter.get("/:id", async (req, res) => {
  const course = await coursesController.getOne(req, res);
  const offerings = await offeringsController.getAllForCourse(req, res);
  res.render("./courses/course", { offerings, course });
});

module.exports = courseRouter;
