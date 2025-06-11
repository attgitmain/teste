import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('ChipMaturations', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      originChipId: {
        type: DataTypes.STRING
      },
      targetChipIds: {
        type: DataTypes.JSONB
      },
      days: {
        type: DataTypes.INTEGER
      },
      conversations: {
        type: DataTypes.JSONB
      },
      startAt: {
        type: DataTypes.DATE
      },
      endAt: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.STRING
      },
      companyId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ChipMaturations');
  }
};
