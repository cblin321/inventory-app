const { Router } = require("express");

const offeringsController = require("../controllers/OfferingsController");
const courseController = require("../controllers/CoursesController");
const { validationResult, body } = require("express-validator");

const offeringsRouter = Router();

const isTime = (value) => {
  const match_12 = value.match(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i);
  const match_24 = value.match(/^(((2[0-3])|(0?[1-9]|1[0-9])):[0-5][0-9])$/i);
  if (!match_12 && !match_24) {
    throw new Error("Invalid time format.");
  }
  return true;
};

const SEMESTER_VALUES = ["SPRING", "FALL", "SUMMER"];

const updateValidators = [
  body("start")
    .custom((value) => isTime(value))
    .withMessage("Invalid time format.")
    .custom((value, { req }) => {
      console.log(req.body);
      const start = value.split(":").map((val) => parseInt(val));
      const end = req.body["end"].split(":").map((val) => parseInt(val));
      const err = new Error("Start cannot be after end");
      if (start[0] > end[0]) throw err;

      if (start[0] == end[0] && start[1] > end[1]) throw err;

      return true;
    })
    .withMessage("Start must be before end."),
  body("end")
    .custom((value) => isTime(value))
    .withMessage("Invalid time format."),
  body("sem")
    .isIn(SEMESTER_VALUES)
    .withMessage("Semester must be: SPRING, FALL, or SUMMER"),
  body("cap")
    .isInt({ gt: "0" })
    .custom((value, { req }) => {
      if (value < parseInt(req.body.num_enrolled))
        throw new Error("Cannot have capacity be less than enrolled students");

      return true;
    }),
];

//testing endpoint
offeringsRouter.get("/", async (req, res) => {
  const offerings = await offeringsController.getAll();
  res.render("./offerings/offerings", { offerings });
});

offeringsRouter.get("/:id/add", async (req, res) => {
  const course = (await courseController.getOne(req, res))[0];
  res.render("./offerings/add_offering", { course });
});

offeringsRouter.post("/:id/add", [
  updateValidators,
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty())
      return res.status(400).json({
        error: "Invalid input",
        details: results.array(),
      });
    await offeringsController.createCourseOffering(req, res);
    res.redirect(`../${req.params["id"]}`).status(200);
  },
]);

offeringsRouter.get("/:id/edit", async (req, res) => {
  const offering = (await offeringsController.getOne(req, res))[0];
  res.render("./offerings/edit_offerings", { offering });
});

offeringsRouter.post("/:id/delete", async (req, res) => {
  await offeringsController.deleteCourseOffering(req, res);
  res.redirect(`../${req.params["id"]}`).status(200);
});

offeringsRouter.post("/:id/edit", [
  updateValidators,
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty())
      return res.status(400).json({
        error: "Invalid input",
        details: results.array(),
      });
    await offeringsController.updateCourseOffering(req, res);
    const id = req.params["id"];
    res.redirect(`../${id}`);
  },
]);

//get offerings for a certain courseID
offeringsRouter.get("/:id", [
  async (req, res) => {
    let offerings = await offeringsController.getAllForCourse(req, res);
    offerings = offerings.map((offering) => ({
      ...offering,
      updateURL: `/offerings/${offering.offering_id}/edit`,
      deleteURL: `/offerings/${offering.offering_id}/delete`,
    }));
    res.render("./offerings/offerings", {
      offerings,
      addURL: `/offerings/${req.params.id}/add`,
    });
  },
]);

module.exports = offeringsRouter;
