const { Router } = require("express");

const courseRouter = Router();
const coursesController = require("../controllers/CoursesController");
const offeringsController = require("../controllers/OfferingsController");

courseRouter.get("/", async (req, res) => {
  let allCourses = await coursesController.getAllCourses();
  allCourses = allCourses.map((course) => ({
    ...course,
    offeringsURL: `../offerings/${course.course_number}`,
  }));
  res.render("./courses/courses", { courses: allCourses,
    addURL: "/courses/add/"
  });
});

courseRouter.get("/:id", async (req, res) => {
  const course = await coursesController.getOne(req, res);
  const offerings = await offeringsController.getAllForCourse(req, res);
  res.render("./courses/course", { offerings, course });
});

courseRouter.get("/course/:id/subjects", async (req, res) => {});

courseRouter.delete("/course/:id", async (req, res) => {
  coursesController.deleteCourse(req, res);
});

courseRouter.post("/course/add", async (req, res) => {
  coursesController.addCourse(req, res);
});

courseRouter.put("/course/:id", async (req, res) => {
  coursesController.updateCourse(req, res);
});

module.exports = courseRouter;
