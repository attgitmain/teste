import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('ChipMaturationLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      chipMaturationId: {
        type: DataTypes.UUID,
        references: { model: 'ChipMaturations', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      fromChip: {
        type: DataTypes.STRING
      },
      toChip: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.TEXT
      },
      success: {
        type: DataTypes.BOOLEAN
      },
      error: {
        type: DataTypes.TEXT
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
    await queryInterface.dropTable('ChipMaturationLogs');
  }
};
