import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("ChipMaturations", "intervalHours", {
      type: DataTypes.INTEGER,
      defaultValue: 1
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("ChipMaturations", "intervalHours");
  }
};
