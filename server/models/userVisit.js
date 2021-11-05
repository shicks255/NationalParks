module.exports = (sequelize, Sequelize) => {
  const UserVisit = sequelize.define("user_visit", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      //foreign key of User
      type: Sequelize.INTEGER,
    },
    parkId: {
      //foreign key of Park
      type: Sequelize.INTEGER,
    },
    visited: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.DECIMAL,
    },
  });

  return UserVisit;
};
