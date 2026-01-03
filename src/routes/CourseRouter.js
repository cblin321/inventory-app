const { Router } = require("express");

const courseRouter = Router();
const coursesController = require("../controllers/CoursesController")
const offeringsController = require("../controllers/OfferingsController")
const offeringsRouter = require("./OfferingsRouter")
courseRouter.use("/offerings", offeringsRouter)

courseRouter.get("/", async (req, res) => {
  let allCourses = await coursesController.getAllCourses();
  res.render("./courses/courses", {
    courses: allCourses,
    addURL: "/courses/add/",
  });
});

courseRouter.get("/add", async (req, res) => {
  res.render("./courses/add_courses");
});

courseRouter.post("/add", async (req, res) => {
  await coursesController.addCourse(req, res)
  res.redirect("/courses")
});

//courseRouter.get("/subjects/:id", async (req, res) => {});

courseRouter.post("/delete/:id", async (req, res) => {
  await coursesController.deleteCourse(req, res);
  res.redirect("/")
})

courseRouter.get("/update/:id", async (req, res) => {
  const id = req.params.id
  const course = (await coursesController.getOne(req, res))
  if (course.length > 1) {
    throw new Error("duplicate courses in db")
  }
  res.render("./courses/edit_courses", {
    course: course[0], 
    id
  })

});

courseRouter.post("/update/:id", async (req, res) => {
  await coursesController.updateCourse(req, res)
  res.redirect("/")
})

courseRouter.get("/:id", async (req, res) => {
  const course = await coursesController.getOne(req, res);
  const offerings = await offeringsController.getAllForCourse(req, res);
  res.render("./courses/course", { offerings, course });
});

module.exports = courseRouter;
