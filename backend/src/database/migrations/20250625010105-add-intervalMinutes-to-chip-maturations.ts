import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("ChipMaturations", "intervalMinutes", {
      type: DataTypes.INTEGER,
      defaultValue: 60
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("ChipMaturations", "intervalMinutes");
  }
};
