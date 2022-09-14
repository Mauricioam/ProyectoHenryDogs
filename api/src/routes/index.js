const { Router } = require("express");
const dogRoute = require("./dogs");
const temperamentRoute = require("./temperament");

const router = Router();

router.use("/dogs", dogRoute);
router.use("/temperament", temperamentRoute);

module.exports = router;
