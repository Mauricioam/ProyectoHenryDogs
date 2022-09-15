const { Router, response } = require("express");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY, API_URL } = process.env;

const router = Router();
//ruta lista GET dogs/ __ dogs?name=

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

    await newDog.addTemperament(dogTemp);
    // testing
    res.status(201).send("Dog created");
  } catch (error) {
    next(error);
  }
});

 router.get("/", async (req, res, next) => {
  const { name } = req.query;
  let dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);

  try {
    if (name) {
      let dogsDb = await Dog.findAll({
        include: Temperament,
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        order: [["name", "ASC"]],
      });

      let dogsDbFiltered = dogsDb.map((ele) => {
        return {
          id: ele.id,
          image: ele.image,
          name: ele.name,
          temperaments: ele.temperaments.map((ele) => ele.name),
          weight: `${ele.minWeight} - ${ele.maxWeight}`,
        };
      });

        let findDog = dogsApi.data.filter((ele) =>
          ele.name.toLowerCase().includes(name.toLocaleLowerCase())
      );

      let findDogFiltered = await findDog.map((ele) => {
        return {
          id: ele.id,
          image: ele.image.url,
          name: ele.name,
          temperament: ele.temperament,
          weight: ele.weight.metric,
        };
      });      

      let result = dogsDbFiltered.concat(findDogFiltered);
      result.length ? res.json(result) : res.status(404).send("No dog found")
    } else {
      let arrangeTemp = []

      let dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      let dogsDb = await Dog.findAll({
        include: Temperament,
      });

      let dogsDbFiltered = dogsDb.map((ele) => {
        return {
          id: ele.id,
          image: ele.image,
          name: ele.name,
          temperament: ele.temperaments.map((ele) => ele.name),
          weight: `${ele.minWeight} - ${ele.maxWeight}`,
        };
      });



       dogsApi.data.map((ele) => {
        arrangeTemp.push({
          id: ele.id,
          image: ele.image.url,
          name: ele.name,
          temperament: Object.assign([],  ele.temperament).join("").split(","),
          weight:ele.weight.metric,
      
        });
      });
 
      let allDogsFiltered = dogsDbFiltered.concat(arrangeTemp);
      
      return res.send(allDogsFiltered);
    }
  } catch (error) {
    next(error);
  }
}); 

 



/* [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida

Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados*/

router.get("/:dogId", async (req, res, next) => {
  const { dogId } = req.params;
  let dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);

  try {
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        dogId
      )
    ) {
      let dogsDb = await Dog.findAll({
        include: Temperament,
        where: {
          id: dogId,
        },
      });
      let dogsDbFiltered = dogsDb.map((ele) => {
        return {
          id: ele.id,
          image: ele.image,
          name: ele.name,
          temperament: ele.temperaments.map((ele) => ele.name),
          weight: `${ele.minWeight} - ${ele.maxWeight}`,
          height: `${ele.minHeight} - ${ele.maxHeight}`,
          life_expectancy: ele.life_expectancy,
        };
      });

      res.json(dogsDbFiltered);
    } else {
      let findDog = await dogsApi.data.filter((ele) => ele.id == dogId);
      let dogsApiFiltered = await findDog.map((ele) => {
        return {
          id: ele.id,
          image: ele.image.url,
          name: ele.name,
          temperament: Object.assign([], ele.temperament).join("").split(","),
          weight: ele.weight.metric,
          height: ele.height.metric,
          life_expectancy: ele.life_span,
        };
      });
      dogsApiFiltered.length
        ? res.json(dogsApiFiltered)
        : res.status(404).send("Sorry we couldn't find anything :(");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
