const { Router } = require('express');
const dogRoute = require("./dogs");
const temperamentRoute = require("./temperament")
const createDogRoute = require("./createDog")




const router = Router();
//GET
router.use("/dogs", dogRoute);
router.use("/temperament", temperamentRoute)

//POST
router.use("/dogs", createDogRoute)


module.exports = router;
