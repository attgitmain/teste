import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn("Prompts", "prompt1", {
        type: DataTypes.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn("Prompts", "prompt2", {
        type: DataTypes.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn("Prompts", "prompt3", {
        type: DataTypes.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn("Prompts", "activePrompt", {
        type: DataTypes.INTEGER,
        defaultValue: 0
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("Prompts", "prompt1"),
      queryInterface.removeColumn("Prompts", "prompt2"),
      queryInterface.removeColumn("Prompts", "prompt3"),
      queryInterface.removeColumn("Prompts", "activePrompt")
    ]);
  }
};
