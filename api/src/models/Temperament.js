const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("temperement", {
    name: {
      type: DataTypes.STRING,
    },
  });
};
