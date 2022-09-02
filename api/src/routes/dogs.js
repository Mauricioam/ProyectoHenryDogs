const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY, API_URL } = process.env;

const router = Router();
//ruta lista GET dogs/ __ dogs?name=
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
      let findDog = dogsApi.data.filter((ele) =>
        ele.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      let result = dogsDb.concat(findDog);
      result.length ? res.json(result) : res.status(404).send("Name not found");
    } else {
      /*  Imagen
      Nombre
      Temperamento
      Peso
 */
      let dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      let dogsDb = await Dog.findAll({
        include: Temperament,
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

      let resultFiltered = await dogsApi.data.map((ele) => {
        return {
          id: ele.id,
          image: ele.image.url,
          name: ele.name,
          temperament: ele.temperament,
          weight: ele.weight.metric,
        };
      });
      let allDogsFiltered = dogsDbFiltered.concat(resultFiltered);

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
        where: {
          id: dogId,
        },
      });

      dogsDb.length ? res.json(dogsDb) : "";
    } else {
      let findDog = await dogsApi.data.filter((ele) => ele.id == dogId);

      findDog.length
        ? res.json(findDog)
        : res.status(404).send("Id not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
