// Author: Viren Babubhai Malavia (B00895669)

module.exports = (sequelize, Sequelize) => {
  const Favorites = sequelize.define("favorites", {
    favorite_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      required: true,
    },
    property_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      required: true,
    },
    isFavorite: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return Favorites;
};
