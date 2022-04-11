module.exports = (sequelize, Sequelize) => {
  // const Tutorial = sequelize.define("tutorial", {
  //   title: {
  //     type: Sequelize.STRING,
  //   },
  //   description: {
  //     type: Sequelize.STRING,
  //   },
  //   published: {
  //     type: Sequelize.BOOLEAN,
  //   },
  // });

  // return Tutorial;



   return sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      unique: true
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  
};

