import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn("Prompts", "rotatePrompts", {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn("Tickets", "promptVariant", {
        type: DataTypes.INTEGER,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("Prompts", "rotatePrompts"),
      queryInterface.removeColumn("Tickets", "promptVariant")
    ]);
  }
};
