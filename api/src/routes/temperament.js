const { Router } = require("express");
const { Temperament } = require("../db");
const axios = require("axios");
const { API_KEY, API_URL } = process.env;

const router = Router();
//falta obtener temperaments de la api, luego guardarlos en la base de datos para solo tomarla de ahi
router.get("/", async (req, res, next) => {
  let dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);

  let temperament = [];
  try {
    for (let i = 0; i < dogsApi.data.length; i++) {
      temperament = temperament.concat(dogsApi.data[i].temperament);
    }
    let tempJoin = temperament.join("").split(",");
    let final = [...new Set(tempJoin)];
    let finalTrim = [];
    for (let j = 0; j < final.length; j++) {
      finalTrim.push(final[j].trim());
    }

    for (let i = 0; i < finalTrim.length; i++) {
      await Temperament.findOrCreate({
        where: {
          name: finalTrim[i],
        },
      });
    }

    let load = await Temperament.findAll();

    res.json(load);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
