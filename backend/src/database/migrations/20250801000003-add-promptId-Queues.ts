import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const table = "Queues";
    const column = "promptId";

    const tableInfo = await queryInterface.describeTable(table);
    if (tableInfo[column]) {
      return Promise.resolve();
    }

    return queryInterface.addColumn(table, column, {
      type: DataTypes.INTEGER,
      references: { model: "Prompts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Queues", "promptId");
  }
};
