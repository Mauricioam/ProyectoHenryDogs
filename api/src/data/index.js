/* const { API_KEY, API_URL } = process.env;
const { Dog, Temperament } = require("../db");
const axios = require("axios");

const getData = async (req, res, next) => {
  const api = await axios.get(`${API_URL}?api_key=${API_KEY}`);
  //console.log(api.data)
  const db = await Dog.findAll({
    include: Temperament,
  });
  //console.log(db)
   Promise.all([api, db]).then((response) => {
    const [infoApi, infoDb] = response;
    const dogInfo = infoApi.data.map((ele) => {
      return {
        id: ele.id,
        name: ele.name,
        race: ele.breed_group,
        lifeExpecancy: ele.life_span,
        temperament: ele.temperament,
        image: ele.image,
      };
    });

    const allData = infoDb.concat(dogInfo)
    //console.log(allData);
    //console.log(infoDb)
    res.json(allData);
  });
}

module.exports = { getData };
 */

//FUNCIONA PERO EN LAS RUTAS ME SALE UNDEFINED