module.exports = (sequelize, Sequelize) => {
  const Park = sequelize.define("park", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.DECIMAL,
    },
    longitude: {
      type: Sequelize.DECIMAL,
    },
    // outline: {
    //   type: Sequelize.ARRAY(
    //     Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DECIMAL))
    //   ),
    // },
    outline: {
      type: Sequelize.TEXT,
    },
  });

  return Park;
};
