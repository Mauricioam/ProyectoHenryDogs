const { Router } = require("express");
const { Dog, Temperament } = require("../db");

const router = Router();

router.post("/", async (req, res, next) => {
  const {
    name,
    maxHeight,
    minHeight,
    maxWeight,
    minWeight,
    image,
    life_expectancy,
    description,
    temperament, 
  } = req.body;
  try {
    const newDog = await Dog.create({
      name,
      maxHeight,
      minHeight,
      maxWeight,
      minWeight,
      image,
      life_expectancy,
      description,
    });

     let dogTemp = await Temperament.findAll({
      where: {
        name: temperament,
      },
    }); 

   await newDog.addTemperaments(dogTemp); 
    // testing 
    res.status(201).send("Dog created");
  } catch (error) {
    next(error);
  }
});



module.exports = router;
