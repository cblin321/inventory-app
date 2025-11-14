const { Router } = require("express");

const offeringsController = require("../controllers/OfferingsController");
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

const SEMESTER_VALUES = ['SPRING', 'FALL', 'SUMMER']

const updateValidators = [
  body("start")
    .custom((value) => isTime(value)).withMessage("Invalid time format.")
    .custom((value, { req }) => {
        console.log(req.body)
      const start = value.split(":").map((val) => parseInt(val));
      const end = req.body["end"].split(":").map((val) => parseInt(val));
      const err = new Error("Start cannot be after end");
      if (start[0] > end[0]) throw err;

      if (start[0] == end[0] && start[1] > end[1]) throw err;

      return true;
    }).withMessage("Start must be before end."),
  body("end").custom((value) => isTime(value)).withMessage("Invalid time format."),
  body("sem").isIn(SEMESTER_VALUES).withMessage("Semester must be: SPRING, FALL, or SUMMER"),

];

//testing endpoint
offeringsRouter.get("/", async (req, res) => {
  const offerings = await offeringsController.getAll();
  res.render("./offerings/offerings", { offerings });
});

offeringsRouter.post("/offerings/add", async (req, res) => {
  offeringsController.createCourseOffering(req, res);
});

offeringsRouter.get("/edit/:id", async (req, res) => {
  const offering = (await offeringsController.getOne(req, res))[0];
  res.render("./offerings/edit_offerings", { offering });
});

offeringsRouter.delete("/offerings/:id", async (req, res) => {
  offeringsController.deleteCourseOffering(req, res);
});

offeringsRouter.post("/edit/:id", [ updateValidators, (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) 
        return res.status(400).json({
            error: "Invalid input",
            details: results.array()
    })
  offeringsController.updateCourseOffering(req, res);
  const id = req.params["id"];
  res.redirect(`../${id}`);
}]);

offeringsRouter.get("/:id", [
  async (req, res) => {
    const offerings = await offeringsController.getOne(req, res);
    res.render("./offerings/offerings", {
      offerings,
      updateURL: `/offerings/edit/${req.params.id}`,
      deleteURL: `/offerings/delete/${req.params.id}`,
    });
  },
]);

module.exports = offeringsRouter;
